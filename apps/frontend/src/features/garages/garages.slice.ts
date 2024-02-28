import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import getGarages, { WithOwnerGarage } from '@/api/garages/getGarages'
import { FetchStatus, GarageQueryParams, Paging } from '@/core/types'

export type GaragesState = Partial<Paging> & {
    garages: WithOwnerGarage[],
    fetchingStatus: FetchStatus,
    isReload: boolean,    
}

const defaultPaging = {
    // TODO: testing purpose only
    nextCursor: undefined
}

const initialState: GaragesState = {
    garages: [],
    fetchingStatus: FetchStatus.None,
    isReload: true,
    ...defaultPaging
}

const garagesSlice = createSlice({
    name: "garages",
    initialState,
    reducers: {
        reloadGarages(state) {
            state.isReload = true
        },
        unloadGarages(state) {
            state.isReload = false
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getListGararges.pending, (state) => {
                state.fetchingStatus = FetchStatus.Fetching
            })
            .addCase(getListGararges.fulfilled, (state, action) => {
                const { data: garages, nextCursor, total } = action.payload
                state.fetchingStatus = FetchStatus.Fulfilled
                state.garages = garages
                state.nextCursor = nextCursor,
                state.total = total
            })
            .addCase(getListGararges.rejected, (state) => {
                state.fetchingStatus = FetchStatus.Rejected
            })
    }
})

export const getListGararges = createAsyncThunk("garages/getGarages", async (params?: GarageQueryParams) => {
    try {
        const result = await getGarages({...params, limit: 1});
        return result
    } catch(err) {
        throw new Error()
    }
})

export const { reloadGarages, unloadGarages } = garagesSlice.actions 

export default garagesSlice.reducer