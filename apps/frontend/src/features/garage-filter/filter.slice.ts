import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GarageFilter } from "@/core/types";

const initialGarageFilterState: GarageFilter = {
    priceRange: {
        from: undefined,
        to: undefined,
    },
    distance: undefined,
    additional: undefined,
    ratings: [],
    brands: [],
};

const garageFilterSlice = createSlice({
    name: "filter",
    initialState: initialGarageFilterState,
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

export const { setFilterValue, clearFilterValue, setFilter } = garageFilterSlice.actions

export default garageFilterSlice.reducer;