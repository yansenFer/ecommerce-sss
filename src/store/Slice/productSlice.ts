import { ICategory } from '@/interface'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ProductState {
  dataProduct: ICategory[]
}

const initialState: ProductState = {
  dataProduct: [],
}

export const productSlice = createSlice({
  name: 'getProduct',
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<ICategory[]>) => {
      state.dataProduct = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setProduct } = productSlice.actions

export default productSlice.reducer
