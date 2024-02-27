import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { FetchStatus, Response, User } from '@/core/types'
import { getUser, signup } from '@/api'
import { HttpStatusCode } from 'axios'
import { auth } from '@/components/firebase'

export type UserSliceState = {
    status: FetchStatus,
    value?: User
}

const initialState: UserSliceState = {
    status: FetchStatus.None,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signOut() {
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
            if (action.payload) {
                state.status = FetchStatus.Fulfilled,
                state.value = action.payload as User
            } else {
                state.status = FetchStatus.Rejected
            }
        })
    }
})

export const getUserById = createAsyncThunk("user/getUserById", async (id: string, { rejectWithValue }) => {
    try {
        return (await getUser(id)).data
    } catch (_error: unknown) {
        const error = JSON.parse((_error as Error).message) as Response

        if (error.statusCode === HttpStatusCode.NotFound) {
            const user = await signup(auth.currentUser!)
            return rejectWithValue(user)
        } else {
            throw new Error("ERROR")
        }
    }
})

export const { signOut } = userSlice.actions

export default userSlice.reducer;