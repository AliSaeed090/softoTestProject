import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "../services/api";
import { ProductInterface } from "../../utilities/Interface";
import { rootUrl } from "../../utilities/constants";

interface ProductsState {
  loading: boolean;
  productsList: Array<ProductInterface>;
}
export const getProducts = createAsyncThunk(
  "benirvingplt/products/products",
  async () => {
    try {
      const response = await get(`${rootUrl}/benirvingplt/products/products`);
      return response.data;
    } catch (err: any) {
      console.log({ errorz: err.message });
      throw err;
    }
  }
);

const initialState: ProductsState = {
  loading: false,
  productsList: [],
};

const ProductSlice = createSlice({
  name: "ProductSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action: any) => {
      state.loading = false;
      state.productsList = action.payload;
    });
    builder.addCase(getProducts.rejected, (state, error: any) => {
      state.loading = false;
    });
  },
});

export default ProductSlice.reducer;
