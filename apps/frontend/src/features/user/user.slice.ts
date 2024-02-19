import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'

import { ActorType, FetchStatus, User } from '@/core/types'

const initialState = {
    status: FetchStatus.None,
    value: undefined as unknown as Partial<User>
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getUserById.pending, (state) => {
            state.status = FetchStatus.Fetching
        }).addCase(getUserById.fulfilled, (_, action) => {
            return {
                status: FetchStatus.Fulfilled,
                value: action.payload
            }
        })
    }
})

// TODO: replace to the real api
export const getUserById = createAsyncThunk("user/getUserById", async (uid: string): Promise<Partial<User>> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ _id: nanoid(), type: ActorType.User })
        }, 5000)
    })
}) 

export default userSlice.reducer;