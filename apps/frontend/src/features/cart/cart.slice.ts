import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Order } from '@/core/types'

const ordersAdapter = createEntityAdapter<Order, string>({
    selectId: order => order._id,
})

const cartSlice = createSlice({
    name: "cart",
    initialState: ordersAdapter.getInitialState(),
    reducers: {
        orderAdded: ordersAdapter.addOne,
        orderRemoved: ordersAdapter.removeOne,
        orderReceived: (state, action: PayloadAction<Order[]>) => {
            ordersAdapter.setAll(state, action.payload)
        },
        orderUpdated: ordersAdapter.updateOne
    }
})

export const {
    orderAdded,
    orderReceived,
    orderRemoved,
    orderUpdated
} = cartSlice.actions

export default cartSlice.reducer