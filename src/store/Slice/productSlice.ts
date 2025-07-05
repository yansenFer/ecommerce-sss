import { ICategory, IProduct } from '@/interface'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ProductState {
  dataProduct: IProduct[]
  filterCategory: ICategory
}

const initialState: ProductState = {
  dataProduct: [],
  filterCategory: {},
}

export const productSlice = createSlice({
  name: 'getProduct',
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<IProduct[]>) => {
      state.dataProduct = action.payload
    },
    setFilterCategory: (state, action: PayloadAction<ICategory>) => {
      state.filterCategory = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setProduct, setFilterCategory } = productSlice.actions

export default productSlice.reducer
