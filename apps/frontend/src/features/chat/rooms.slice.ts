import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
    createSelector,
    EntityState,
    PayloadAction,
} from "@reduxjs/toolkit";
import {
    MessageWithServices,
    createRoom,
    deleteRoom,
    getRooms,
    muteRoom,
    trackingActivity,
} from "@/api/chat";
import { FetchStatus, Room, RoomStatus, RoomType } from "@/core/types";
import { AppState } from "@/store";

export type RoomEntry = Omit<Room, "messages"> & {
    messages: EntityState<MessageWithServices, string>;
};

const roomsAdapter = createEntityAdapter<RoomEntry, string>({
    selectId: (room) => room.roomId,
});

const messagesAdapter = createEntityAdapter<MessageWithServices, string>({
    selectId: (message) => message._id,
    sortComparer: (a, b) => a.createdAt - b.createdAt,
});

const initialState = {
    fetchingStatus: FetchStatus.None,
    fetchingStatusCreate: FetchStatus.None,
    fetchingStatusActivity: FetchStatus.None,
    rooms: roomsAdapter.getInitialState(),
};

const roomSlice = createSlice({
    name: "rooms",
    initialState: initialState,
    reducers: {
        roomReset(state) {
            roomsAdapter.removeAll(state.rooms);
        },
        receivedMessages: (state, action) => {
            const payload = action.payload;
            const roomId = payload.roomId;
            const roomEntry = state.rooms.entities[roomId];

            if (roomEntry) {
                messagesAdapter.upsertMany(
                    roomEntry.messages,
                    payload.messages,
                );
            }
        },
        receivedMessage: (state, action) => {
            const payload = action.payload;
            const roomId = payload.roomId;
            const roomEntry = state.rooms.entities[roomId];
            if (roomEntry) {
                roomsAdapter.updateOne(state.rooms, {
                    id: roomEntry.roomId,
                    changes: {
                        hasRead: payload.hasRead,
                    },
                });
                roomEntry.messages = messagesAdapter.upsertOne(
                    roomEntry.messages,
                    payload,
                );

                roomEntry.latestMessage = payload;

                const listRoom = [
                    ...roomsAdapter.getSelectors().selectAll(state.rooms),
                ];

                listRoom.forEach(function (item, i) {
                    if (item.roomId === payload.roomId) {
                        listRoom.splice(i, 1);
                        listRoom.unshift(item);
                    }
                });

                roomsAdapter.setAll(state.rooms, listRoom);
            }
        },
        receivedTyping: (state, action) => {
            const payload = action.payload;
            const roomId = payload.roomId;
            const roomEntry = state.rooms.entities[roomId];
            roomEntry.isTyping = payload.isTyping;
        },
        markRoomAsRead: (state, action: PayloadAction<RoomEntry>) => {
            const room = action.payload;
            roomsAdapter.upsertOne(state.rooms, room);
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getListRooms.pending, (state) => {
                state.fetchingStatus = FetchStatus.Fetching;
            })
            .addCase(getListRooms.fulfilled, (state, action) => {
                state.fetchingStatus = FetchStatus.Fulfilled;
                const data = action.payload;
                const listRoom = data.data.sort(
                    (a, b) =>
                        b?.latestMessage?.createdAt -
                            a?.latestMessage?.createdAt || 0,
                );

                const cloned: RoomEntry[] = listRoom?.map((room) => {
                    const roomEntry = state.rooms.entities[room.roomId];
                    if (roomEntry) {
                        const listMess = messagesAdapter
                            .getSelectors()
                            .selectAll(
                                state.rooms.entities[room.roomId].messages,
                            );

                        return {
                            ...room,
                            ...roomEntry,
                            messages: messagesAdapter.upsertMany(
                                state.rooms.entities[room.roomId].messages,
                                listMess,
                            ),
                        };
                    }

                    return {
                        ...room,
                        messages: messagesAdapter.getInitialState(),
                    };
                });

                roomsAdapter.upsertMany(state.rooms, cloned);
            })
            .addCase(getListRooms.rejected, (state) => {
                state.fetchingStatus = FetchStatus.Rejected;
            })
            .addCase(createNewRoom.pending, (state) => {
                state.fetchingStatusCreate = FetchStatus.Fetching;
            })
            .addCase(createNewRoom.fulfilled, (state, action) => {
                state.fetchingStatusCreate = FetchStatus.Fulfilled;
                const payload = action.payload;
                const newRoomsState: RoomEntry[] = [
                    {
                        ...payload.data,
                        messages: messagesAdapter.getInitialState(),
                    },
                    ...roomsAdapter.getSelectors().selectAll(state.rooms),
                ];
                roomsAdapter.setAll(state.rooms, newRoomsState);
            })
            .addCase(createNewRoom.rejected, (state) => {
                state.fetchingStatusCreate = FetchStatus.Rejected;
            })

            .addCase(deleteCurrentRoom.pending, (state) => {
                state.fetchingStatus = FetchStatus.Fetching;
            })
            .addCase(deleteCurrentRoom.fulfilled, (state, action) => {
                state.fetchingStatus = FetchStatus.Fulfilled;
                const roomId = action.meta.arg.roomId;
                roomsAdapter.removeOne(state.rooms, roomId);
            })
            .addCase(deleteCurrentRoom.rejected, (state) => {
                state.fetchingStatus = FetchStatus.Rejected;
            })

            .addCase(muteCurrentRoom.fulfilled, (state, action) => {
                const updatePayload = action.meta.arg;
                roomsAdapter.upsertOne(state.rooms, {
                    roomId: updatePayload.roomId,
                    status: updatePayload.isMute,
                } as RoomEntry);
            })

            .addCase(trackingActivityStatus.pending, (state) => {
                state.fetchingStatusActivity = FetchStatus.Fetching;
            })
            .addCase(trackingActivityStatus.fulfilled, (state, action) => {
                const payload = action.payload;

                roomsAdapter.upsertOne(state.rooms, {
                    ...payload?.data,
                } as RoomEntry);
                state.fetchingStatusActivity = FetchStatus.Fulfilled;
            })
            .addCase(trackingActivityStatus.rejected, (state) => {
                state.fetchingStatusActivity = FetchStatus.Rejected;
            });
    },
});

export const getListRooms = createAsyncThunk(
    "rooms/getRooms",
    async (roomIds: string[]) => {
        try {
            const result = await getRooms(roomIds);
            return result;
        } catch (err) {
            return Promise.reject(err);
        }
    },
);

export const trackingActivityStatus = createAsyncThunk(
    "tracking/trackingActivity",
    async (params: {
        userId: string;
        entityId: string;
        roomId: string;
        type: RoomType;
    }) => {
        try {
            const { userId, entityId, roomId, type } = params;
            const result = await trackingActivity(
                userId,
                entityId,
                roomId,
                type,
            );
            return result;
        } catch (err) {
            return Promise.reject(err);
        }
    },
);

export const createNewRoom = createAsyncThunk(
    "rooms/createRoom",
    async (params: {
        userId: string;
        entityId: string;
        type: RoomType;
        attachEntityId?: string;
    }) => {
        try {
            const result = await createRoom(params);
            return result;
        } catch (err) {
            return Promise.reject(err);
        }
    },
);

export const deleteCurrentRoom = createAsyncThunk(
    "rooms/deleteRoom",
    async (params: { roomId: string; room_id: string }) => {
        try {
            const { room_id } = params;
            const result = await deleteRoom(room_id);
            return result;
        } catch (err) {
            return Promise.reject(err);
        }
    },
);

export const muteCurrentRoom = createAsyncThunk(
    "rooms/muteRoom",
    async (params: { roomId: string; room_id: string; isMute: RoomStatus }) => {
        try {
            const { room_id, isMute } = params;
            const result = await muteRoom(
                room_id,
                isMute === RoomStatus.Active ? false : true,
            );
            return result;
        } catch (err) {
            return Promise.reject(err);
        }
    },
);

export const selectRooms = createSelector(
    (state) => state,
    (state: AppState) => {
        return roomsAdapter.getSelectors().selectAll(state.rooms.rooms);
    },
);

export const selectMessages = createSelector(
    (state) => state,
    (state) => {
        return messagesAdapter.getSelectors().selectAll(state.messages);
    },
);

export const hasAllMessageRead = (state: AppState) => {
    const rooms = selectRooms(state);

    if (rooms.length === 0) {
        return true;
    }

    return rooms.every(({ hasRead }) => hasRead);
};

export const {
    receivedMessages,
    receivedMessage,
    receivedTyping,
    roomReset,
    markRoomAsRead,
} = roomSlice.actions;

export const { selectById: selectRoomById } = roomsAdapter.getSelectors();

export default roomSlice.reducer;
