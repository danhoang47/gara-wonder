import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from '@/core/types'

const userSlice = createSlice({
    name: "user",
    initialState: null as User | null,
    reducers: {
        signin(state, action: PayloadAction<User>) {
            state = action.payload
        },
        signout(state) {
            state = null
        }
    }
})

export const { signin, signout } = userSlice.actions

export default userSlice.reducer;