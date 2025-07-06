import { IProduct } from '@/interface'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ProductState {
  listCart: IProduct[]
}

const initialState: ProductState = {
  listCart: [],
}

export const productSlice = createSlice({
  name: 'getCart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<IProduct[]>) => {
      state.listCart = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCart } = productSlice.actions

export default productSlice.reducer
