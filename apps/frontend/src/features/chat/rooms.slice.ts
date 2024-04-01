import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
    createSelector,
    EntityState,
} from "@reduxjs/toolkit";
import { createRoom, deleteRoom, getRooms, trackingActivity } from "@/api/chat";
import { FetchStatus, Message, Room } from "@/core/types";
import { AppState } from "@/store";

export type RoomEntry = Omit<Room, "messages"> & {
    messages: EntityState<Message, string>;
};

const roomsAdapter = createEntityAdapter<RoomEntry, string>({
    selectId: (room) => room.roomId,
});

const messagesAdapter = createEntityAdapter<Message, string>({
    selectId: (message) => message._id,
    sortComparer: (a, b) => a.createdAt - b.createdAt,
});

const initialState = {
    fetchingStatus: FetchStatus.None,
    fetchingStatusActivity: FetchStatus.None,
    rooms: roomsAdapter.getInitialState(),
};

const roomSlice = createSlice({
    name: "rooms",
    initialState: initialState,
    reducers: {
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
                const cloned: RoomEntry[] = listRoom.map((room) => {
                    return {
                        ...room,
                        messages: messagesAdapter.getInitialState(),
                    };
                });

                roomsAdapter.setAll(state.rooms, cloned);
            })
            .addCase(getListRooms.rejected, (state) => {
                state.fetchingStatus = FetchStatus.Rejected;
            })
            .addCase(createNewRoom.pending, (state) => {
                state.fetchingStatus = FetchStatus.Fetching;
            })
            .addCase(createNewRoom.fulfilled, (state, action) => {
                state.fetchingStatus = FetchStatus.Fulfilled;
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
                state.fetchingStatus = FetchStatus.Rejected;
            })

            .addCase(deleteCurrentRoom.pending, (state) => {
                state.fetchingStatus = FetchStatus.Fetching;
            })
            .addCase(deleteCurrentRoom.fulfilled, (state, action) => {
                state.fetchingStatus = FetchStatus.Fulfilled;
                const data = action.payload;
                console.log(data);
            })
            .addCase(deleteCurrentRoom.rejected, (state) => {
                state.fetchingStatus = FetchStatus.Rejected;
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

export const getListRooms = createAsyncThunk("rooms/getRooms", async () => {
    try {
        const result = await getRooms();
        return result;
    } catch (err) {
        return Promise.reject(err);
    }
});

export const trackingActivityStatus = createAsyncThunk(
    "tracking/trackingActivity",
    async (params: { userId: string; garageId: string; roomId: string }) => {
        try {
            const { userId, garageId, roomId } = params;
            const result = await trackingActivity(userId, garageId, roomId);
            return result;
        } catch (err) {
            return Promise.reject(err);
        }
    },
);

export const createNewRoom = createAsyncThunk(
    "rooms/createRoom",
    async (params: { userId: string; garageId: string }) => {
        try {
            const { userId, garageId } = params;
            const result = await createRoom(userId, garageId);
            return result;
        } catch (err) {
            return Promise.reject(err);
        }
    },
);

export const deleteCurrentRoom = createAsyncThunk(
    "rooms/deleteRoom",
    async (params: { roomId: string }) => {
        try {
            const { roomId } = params;
            const result = await deleteRoom(roomId);
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

export const { receivedMessages, receivedMessage, receivedTyping } =
    roomSlice.actions;

export default roomSlice.reducer;
