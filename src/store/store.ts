import { configureStore } from '@reduxjs/toolkit'
import productReducer from './Slice/productSlice'
import categoryReducer from './Slice/categorySlice'
import listCardReducer from './Slice/cartSlice'

export const store = configureStore({
  reducer: {
    getProduct: productReducer,
    getCategory: categoryReducer,
    getCart: listCardReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
