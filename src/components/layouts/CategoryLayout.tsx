'use client'

import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'

export const CategoryLayout = () => {
  const categoriesStore = useSelector(
    (state: RootState) => state.getCategory.dataCategory
  )

  return (
    <div className="flex overflow-x-auto scrollbar-hide xl:mx-16 lg:mx-16 md:mx-16 sm:mx-16 mx-3 justify-start flex-row gap-8 items-center">
      <div className="flex flex-row gap-10 items-center">
        <span className="text-blue-600 font-bold">Category: </span>
      </div>
      {categoriesStore.map((category, idx) => (
        <button
          key={idx}
          className="rounded-full min-w-fit line-clamp-1 cursor-pointer bg-blue-50 py-2 px-4 hover:bg-blue-300 transition-all"
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}
