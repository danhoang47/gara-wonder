import { Toast } from "@/core/types";
import store from "@/store";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

const toasts: Array<Toast> = [];

const toastsSlice = createSlice({
    name: "toasts",
    initialState: toasts,
    reducers: {
        notify: {
            prepare(toast: Toast) {
                return {
                    payload: {
                        ...toast,
                        id: nanoid(),
                    },
                };
            },
            reducer(state, action: PayloadAction<Toast>) {
                state.splice(0, 0, action.payload)

                setTimeout(() => {
                   store.dispatch(remove(action.payload.id))
                }, action.payload.delay)
            },
        },
        remove(state, action: PayloadAction<string>) {
            const id = action.payload;

            for (let index = 0; index < state.length; index++) {
                if (state[index].id === id) {
                    state.splice(index, 1);
                    return;
                }
            }
        },
    },
});

export const { notify, remove } = toastsSlice.actions;

export default toastsSlice.reducer;
