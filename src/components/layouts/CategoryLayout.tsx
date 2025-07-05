'use client'

import { ICategory } from '@/interface'
import { setFilterCategory } from '@/store/Slice/productSlice'
import { RootState } from '@/store/store'
import { useDispatch, useSelector } from 'react-redux'

export const CategoryLayout = () => {
  const categoriesStore = useSelector(
    (state: RootState) => state.getCategory.dataCategory
  )
  const filterCategory = useSelector(
    (state: RootState) => state.getProduct.filterCategory
  )
  //set filter categories
  const dispatch = useDispatch()
  const setCategory = (category: ICategory) => {
    dispatch(setFilterCategory(category))
  }

  return (
    <div className="flex overflow-x-auto scrollbar-hover xl:mx-16 lg:mx-16 md:mx-16 sm:mx-16 mx-3 justify-start flex-row gap-8 items-center">
      <div className="flex flex-row gap-10 items-center">
        <span className="text-blue-600 font-bold">Category: </span>
      </div>
      {categoriesStore.map((category, idx) => (
        <button
          key={idx}
          onClick={() => setCategory(category)}
          className={`rounded-full min-w-fit line-clamp-1 cursor-pointer  py-2 px-4 hover:bg-blue-300 transition-all ${
            category.id === filterCategory.id
              ? 'bg-blue-500 text-white'
              : 'bg-blue-50'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}
