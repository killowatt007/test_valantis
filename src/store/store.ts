import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./reducers/ProductSlice";

const rootReducer = combineReducers({
  productReducer: ProductSlice,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']