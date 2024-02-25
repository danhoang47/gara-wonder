import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { FetchStatus, User } from '@/core/types'
import { getUser, signup } from '@/api'
import { HttpStatusCode } from 'axios'
import { auth } from '@/components/firebase'

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

// TODO: replace to the real api
export const getUserById = createAsyncThunk("user/getUserById", async (id: string) => {
    try {
        return (await getUser(id)).data
    } catch (error: unknown) {
        if (typeof error === "object" && error && "message" in error) {
            const message = error.message as string
            
            if (Number.parseInt(message) === HttpStatusCode.NotFound) {
                const user = auth.currentUser

                if (user) {
                    return (await getUser(id)).data
                }
            }
        }

        throw new Error("ERROR")
    }
}) 

export const { signout } = userSlice.actions

export default userSlice.reducer;