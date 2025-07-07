'use client'
import { FiMapPin } from 'react-icons/fi'
import { AiOutlineTruck } from 'react-icons/ai'
import { CiDiscount1 } from 'react-icons/ci'
import { RiMenu5Fill } from 'react-icons/ri'
import { CiSearch } from 'react-icons/ci'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { CategoryLayout } from './CategoryLayout'
import { useDispatch, useSelector } from 'react-redux'
import { useDebouncedCallback } from 'use-debounce'
import { setSearch } from '@/store/Slice/productSlice'
import { RootState } from '@/store/store'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getStorage } from '@/utils/getStorage'
import { ICart } from '@/interface'

export const HeaderLayout = () => {
  const dispatch = useDispatch()
  const listCart = useSelector((state: RootState) => state.getCart.listCart)
  const [countCart, setCountCart] = useState(0)
  const router = useRouter()

  // kalau listcart global state ada perubahan, ambil cart dari local storage lalu disimpan di local state
  useEffect(() => {
    const listCart = getStorage('cart', true)
    const totalCart = listCart?.reduce(
      (acc: number, curr: ICart) => acc + (curr.quantity || 0),
      0
    )
    setCountCart(Number(totalCart))
  }, [listCart])

  //handle search
  const debounced = useDebouncedCallback(
    // function
    (e) => {
      dispatch(setSearch(e))
    },
    // delay in ms
    500
  )

  return (
    <header className="w-full">
      {/* Top Header */}
      <div className=" text-sm bg-gray-100 text-gray-600 py-2">
        <div className="xl:px-16 lg:px-16 md:px-16 sm:px-16 px-3 flex responsive-header justify-between xl:items-center lg:items-center md:items-center sm:items-start items-start">
          <span className="line-clamp-1">Welcome to e-commerce!</span>
          <div className="flex responsive-header xl:items-center lg:items-center md:items-center sm:items-start items-start space-x-6">
            <div className="flex   space-x-1">
              <FiMapPin className="w-4 h-4 min-w-4 min-h-4 text-blue-500" />
              <span className="line-clamp-1">Deliver to 423651</span>
            </div>
            <div className="flex items-center space-x-1">
              <AiOutlineTruck className="w-4 h-4 min-w-4 min-h-4 text-blue-500" />
              <span className="line-clamp-1">Track your order</span>
            </div>
            <div className="flex items-center space-x-1">
              <CiDiscount1 className="w-4 h-4 min-w-4 min-h-4 text-blue-500" />
              <span className="line-clamp-1">All Offers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b-[1px] border-gray-200">
        <div className="xl:px-16 lg:px-16 md:px-16 sm:px-16 px-3 py-4">
          <div className="flex responsive-header justify-between">
            {/* Logo and Menu */}
            <div className="flex items-center space-x-4">
              <button className="lg:hidden">
                <RiMenu5Fill className="w-5 h-5" />
              </button>
              <div className="text-2xl font-bold text-blue-600">e-commerce</div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  onChange={(e) => debounced(e.currentTarget.value)}
                  type="text"
                  placeholder="Search essentials, groceries and more..."
                  className="pl-10 pr-4 py-2 w-full bg-blue-50 border-blue-50 border-2 transition-all  hover:border-blue-300 hover:border-2 focus:outline-none rounded-lg"
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-6">
              <div className="cursor-pointer">
                <button
                  onClick={() => router.push('/cart')}
                  className="flex cursor-pointer items-center space-x-2 relative"
                >
                  <MdOutlineShoppingCart className="w-5 h-5 text-blue-500" />
                  <span>Cart</span>
                  <div
                    hidden={countCart === 0}
                    className="w-5 h-5 -right-3 -top-2 flex rounded-full items-center justify-center bg-blue-600 absolute"
                  >
                    <span className="text-white text-sm">{countCart}</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t-[1px] border-gray-200 py-4 flex w-full">
          <CategoryLayout />
        </div>
      </header>
    </header>
  )
}
