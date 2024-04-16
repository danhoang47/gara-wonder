import { Notification } from '@/core/types'
import { createSlice, createEntityAdapter, EntityState } from '@reduxjs/toolkit'

const notificationsAdapter = createEntityAdapter<Notification, string>({
    selectId: notification => notification._id,
})

const garageNotificationsSlice = createSlice({
    name: "garageNotifications",
    initialState: notificationsAdapter.getInitialState(),
    reducers: {
        notificationsReceived: notificationsAdapter.addMany,
        notificationAdded: notificationsAdapter.addOne,
        notificationUpdated: notificationsAdapter.updateOne,
        notificationUpsert: notificationsAdapter.upsertMany,
        notificationReset: notificationsAdapter.removeAll
    }
})

export const {
    selectAll: selectNotifications
} = notificationsAdapter.getSelectors()

export const hasAllGarageNotificationsRead = (state: EntityState<Notification, string>) => 
selectNotifications(state).every(({ hasRead }) => hasRead)

export const {
    notificationsReceived,
    notificationAdded,
    notificationUpsert,
    notificationReset
} = garageNotificationsSlice.actions

export default garageNotificationsSlice.reducer