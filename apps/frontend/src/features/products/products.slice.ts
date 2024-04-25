import getProducts, { ProductFilters, WithBrandProduct } from "@/api/supplier/getProducts";
import { FetchStatus, Paging } from "@/core/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type ProductState = Partial<Paging> & {
    products: WithBrandProduct[];
    fetchingStatus: FetchStatus;
};

const defaultPaging = {
    nextCursor: undefined,
};

const initialState: ProductState = {
    products: [],
    fetchingStatus: FetchStatus.None,
    ...defaultPaging,
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getListProducts.pending, (state) => {
                state.fetchingStatus = FetchStatus.Fetching;
            })
            .addCase(getListProducts.fulfilled, (state, action) => {
                const { data: products, nextCursor, total } = action.payload;
                state.fetchingStatus = FetchStatus.Fulfilled;
                state.products = products;
                (state.nextCursor = nextCursor), (state.total = total);
            })
            .addCase(getListProducts.rejected, (state) => {
                state.fetchingStatus = FetchStatus.Rejected;
            });
    },
});

export const getListProducts = createAsyncThunk(
    "products/getProducts",
    async (params: ProductFilters) => {
        try {
            const result = await getProducts({ ...params, limit: 20 });
            return result;
        } catch (err) {
            throw new Error();
        }
    },
);

export default productsSlice.reducer;
