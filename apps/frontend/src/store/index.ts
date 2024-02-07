import { configureStore } from "@reduxjs/toolkit";

import { filterReducer } from "@/features/filter";

const store = configureStore({
    reducer: {
        filter: filterReducer
    }
})


export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;