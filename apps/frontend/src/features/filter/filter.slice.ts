import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GarageFilter } from "@/core/types";

const initialFilterState: GarageFilter = {
    priceRange: {
        from: undefined,
        to: undefined,
    },
    distance: undefined,
    additional: undefined,
    ratings: [],
    brands: [],
};

const filterSlice = createSlice({
    name: "filter",
    initialState: initialFilterState,
    reducers: {
        setFilterValue<K extends keyof GarageFilter>(state: GarageFilter, action: PayloadAction<{
            key: K,
            value: GarageFilter[K]
        }>) {
            const { key, value } = action.payload;
            state[key] = value;
        },
        clearFilterValue() {
            return {}
        },
        setFilter(_, action: PayloadAction<GarageFilter>) {
            return action.payload
        }
    }
})

export const selectNumberOfActiveFilterSection = (state: GarageFilter) => {
    return Object.keys(state).reduce<number>((acc, filterKey) => {
        const filterValue = state[filterKey as keyof GarageFilter];

        if (filterValue) {
            if (Array.isArray(filterValue)) {
                return acc + (filterValue.length && 1);
            }
            if (typeof filterValue === "object") {
                return (
                    acc +
                    (Object.values(filterValue).filter(
                        (v) => v !== undefined,
                    ).length && 1)
                );
            }
        }

        return acc;
    }, 0);
}

export const { setFilterValue, clearFilterValue, setFilter } = filterSlice.actions

export default filterSlice.reducer;