import { Notification } from '@/core/types'
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

const notificationsAdapter = createEntityAdapter<Notification, string>({
    selectId: notification => notification._id,
})

const notificationsSlice = createSlice({
    name: "notifications",
    initialState: notificationsAdapter.getInitialState(),
    reducers: {
        notificationsReceived: notificationsAdapter.addMany
    }
})

export const {
    selectAll: selectNotifications
} = notificationsAdapter.getSelectors()

export const {
    notificationsReceived
} = notificationsSlice.actions

export default notificationsSlice.reducer