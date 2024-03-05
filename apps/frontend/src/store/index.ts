import { configureStore } from "@reduxjs/toolkit";

import { garageFilterReducer } from "@/features/garage-filter";
import { toastsReducer } from "@/features/toasts";
import { userReducer } from "@/features/user";
import { garageReducer } from "@/features/garages";
import { cartReducer } from "@/features/cart";

const store = configureStore({
    reducer: {
        filter: garageFilterReducer,
        toasts: toastsReducer,
        user: userReducer,
        garages: garageReducer,
        cart: cartReducer,
    }
})


export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;