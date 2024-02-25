import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { FetchStatus, User } from '@/core/types'
import { getUser } from '@/api'

export type UserSliceState = {
    status: FetchStatus,
    statusCode?: number,
    value?: User
}

const initialState: UserSliceState = {
    status: FetchStatus.None,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signout() {
            return {
                status: FetchStatus.None,
                value: undefined
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(getUserById.pending, (state) => {
            state.status = FetchStatus.Fetching
        }).addCase(getUserById.fulfilled, (_, action) => {
            return {
                status: FetchStatus.Fulfilled,
                value: action.payload
            }
        }).addCase(getUserById.rejected, (state, action) => {
            state.status = FetchStatus.Rejected
        })
    }
})

export const getUserById = createAsyncThunk("user/getUserById", async (id: string) => {
    try {
        return (await getUser(id)).data
    } catch (error: unknown) {
        throw new Error("ERROR")
    }
}) 

export const { signout } = userSlice.actions

export default userSlice.reducer;