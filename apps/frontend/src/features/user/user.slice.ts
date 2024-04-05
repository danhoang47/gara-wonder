import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchStatus, User } from "@/core/types";
import { getGarageByOwnerId, getUser, updateUserProfile } from "@/api";
export enum Type {
    SignIn = 0,
    SignUp,
    SignOut,
}

export type UserSliceState = {
    status: FetchStatus;
    type?: Type;
    value?: User;
    token?: string;
    garageId?: string;
    shopId?: string;
    lng?: number;
    lat?: number;
};

const initialState: UserSliceState = {
    status: FetchStatus.None,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signOut(state) {
            state.status = FetchStatus.Fulfilled;
            state.value = undefined;
            state.token = undefined;
            state.type = Type.SignOut;
            state.garageId = undefined;
            state.shopId = undefined;
        },
        setUserToken(state, action) {
            state.token = action.payload;
        },
        setEmptyUser(state) {
            state.type = Type.SignOut;
            state.status = FetchStatus.Fulfilled;
            state.value = undefined;
            state.token = undefined;
        },
        updateToken(state, action) {
            state.token = action.payload;
        },
        signUp(state) {
            state.type = Type.SignUp 
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getUserById.pending, (state) => {
                state.status = FetchStatus.Fetching;
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.status = FetchStatus.Fulfilled;
                state.value = action.payload;
            })
            .addCase(getUserById.rejected, (state, action) => {
                console.log(action.error)
                state.status = FetchStatus.Rejected
            })
            .addCase(getGarageByUserId.fulfilled, (state, action) => {
                state.garageId = action.payload._id;
            })
            .addCase(updateUser.pending, (state) => {
                state.status = FetchStatus.Fetching;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = FetchStatus.Fulfilled;
                state.value = action.payload
            })
    },
});

export const getUserById = createAsyncThunk(
    "user/getUserById",
    async (id: string) => {
        try {
            return (await getUser(id)).data;
        } catch (error: unknown) {
            return Promise.reject(error)
        }
    },
);

export const getGarageByUserId = createAsyncThunk(
    "user/getGarageByUserId",
    async (id: string) => {
        try {
            return (await getGarageByOwnerId(id)).data;
        } catch (error) {
            return Promise.reject(error)
        }
    },
);

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (formData: FormData) => {
        try {
            return (await updateUserProfile(formData)).data
        } catch(error) {
            return Promise.reject(error)
        }
    }
)

export const { signOut, setUserToken, setEmptyUser, updateToken, signUp } =
    userSlice.actions;

export default userSlice.reducer;
