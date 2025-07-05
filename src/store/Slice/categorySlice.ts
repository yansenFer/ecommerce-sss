import { ICategory } from '@/interface'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CategoryState {
  dataCategory: ICategory[]
}

const initialState: CategoryState = {
  dataCategory: [],
}

export const categorySlice = createSlice({
  name: 'getCategory',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<ICategory[]>) => {
      state.dataCategory = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCategory } = categorySlice.actions

export default categorySlice.reducer
