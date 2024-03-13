import { Notification } from '@/core/types'
import { createSlice, createEntityAdapter, EntityState } from '@reduxjs/toolkit'

const notificationsAdapter = createEntityAdapter<Notification, string>({
    selectId: notification => notification._id,
})

const notificationsSlice = createSlice({
    name: "notifications",
    initialState: notificationsAdapter.getInitialState(),
    reducers: {
        notificationsReceived: notificationsAdapter.addMany,
        notificationAdded: notificationsAdapter.addOne,
        notificationUpdated: notificationsAdapter.updateOne,
        notificationUpsert: notificationsAdapter.upsertMany
    }
})

export const {
    selectAll: selectNotifications
} = notificationsAdapter.getSelectors()

export const hasAllNotificationsRead = (state: EntityState<Notification, string>) => 
selectNotifications(state).every(({ hasRead }) => hasRead)

export const {
    notificationsReceived,
    notificationAdded,
    notificationUpsert
} = notificationsSlice.actions

export default notificationsSlice.reducer