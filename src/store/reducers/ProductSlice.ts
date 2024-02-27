import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../models/IProduct";

interface ProductState {
  products: any
  isLoading: boolean
  error: string
  count: number
}

const initialState: ProductState = {
  products: [],
  isLoading: false,
  error: '',
  count: 0
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    productsFetching: (state) => {
      state.isLoading = true
    },
    productsFetchingSuccess: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
      state.isLoading = false
      state.error = ''
    },
    productsFetchingError: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    }
  }
})

export default productSlice.reducer