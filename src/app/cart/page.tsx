'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi'
import { FaRegTrashAlt } from 'react-icons/fa'
import { getStorage } from '@/utils/getStorage'
import { ICart, IProduct } from '@/interface'
import { addCommas, removeNonNumeric } from '@/utils/formatNumber'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { setCart } from '@/store/Slice/cartSlice'

export default function Page() {
  const listcart = getStorage('cart', true) || []
  const listCartGlobalState = useSelector(
    (state: RootState) => state.getCart.listCart
  )
  const totalItem = new Set(listcart.map((cart: IProduct) => cart.id)).size
  const dispatch = useDispatch()

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity !== 0) {
      const updateCart = (
        listCartGlobalState.length !== 0 ? listCartGlobalState : listcart
      ).map((cart: ICart) =>
        cart.id === id ? { ...cart, quantity: newQuantity } : cart
      )

      console.log(updateCart, 'updatecart')
      localStorage.setItem('cart', JSON.stringify(updateCart))
      dispatch(setCart(updateCart))
    }
  }
  const removeItem = (id: number) => {
    const removeListCart = (
      listCartGlobalState.length !== 0 ? listCartGlobalState : listcart
    ).filter((cart: ICart) => cart.id !== id)

    localStorage.setItem('cart', JSON.stringify(removeListCart))
    dispatch(setCart(removeListCart))
  }

  const subtotal = listcart.reduce(
    (sum: number, item: ICart) => sum + item.price * (item.quantity || 1),
    0
  )

  const deliveryFee = subtotal > 500 ? 0 : 50
  const total = subtotal + deliveryFee

  if (listcart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
              >
                <FaArrowLeftLong className="w-5 h-5" />
                <span>Continue Shopping</span>
              </Link>
              <h1 className="text-2xl font-bold">Shopping Cart</h1>
              <div className="w-32"></div>
            </div>
          </div>
        </header>

        {/* Empty Cart */}
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <FiShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven&apos;t added any items to your cart yet.
          </p>
          <Link href="/">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <FaArrowLeftLong className="w-5 h-5" />
              <span>Continue Shopping</span>
            </Link>
            <h1 className="text-2xl font-bold">
              Shopping Cart ({totalItem} items)
            </h1>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-300">
                <h2 className="text-xl font-semibold">Cart Items</h2>
              </div>
              <div>
                {(listCartGlobalState.length !== 0
                  ? listCartGlobalState
                  : listcart
                ).map((item: ICart, idx: number) => (
                  <div key={idx} className="p-6 flex items-center space-x-4">
                    {/* Product Image */}
                    <div className="relative">
                      <Image
                        src={item.images[0] || '/no-image.png'}
                        alt={item.title}
                        width={120}
                        height={120}
                        className="w-24 h-24 object-contain rounded-lg border"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">
                        {item.title}
                      </h3>
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-2xl font-bold text-green-600">
                          $
                          {addCommas(
                            removeNonNumeric(
                              (
                                (item.price || 0) * (item.quantity || 1)
                              ).toString()
                            ),
                            false
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border  rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, (item.quantity || 1) - 1)
                          }
                          className="h-10 w-10 p-0 cursor-pointer flex items-center justify-center"
                        >
                          <FiMinus className="w-4 h-4" />
                        </button>
                        <input
                          type="number"
                          value={item.quantity || 1}
                          onChange={(e) =>
                            updateQuantity(
                              item.id,
                              Number.parseInt(e.target.value) || 1
                            )
                          }
                          className="w-16 h-10 text-center border-0 focus:ring-0"
                          min="1"
                        />
                        <button
                          onClick={() =>
                            updateQuantity(item.id, (item.quantity || 1) + 1)
                          }
                          className="h-10 w-10 p-0 cursor-pointer flex items-center justify-center"
                        >
                          <FiPlus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <FaRegTrashAlt className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm sticky top-4">
              <div className="p-6 border-b border-gray-300">
                <h2 className="text-xl font-semibold">Order Summary</h2>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between">
                  <span>
                    Subtotal (
                    {listcart.reduce(
                      (sum: number, item: ICart) => sum + (item.quantity || 0),
                      0
                    )}{' '}
                    items)
                  </span>
                  <span className="font-semibold">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span
                    className={
                      deliveryFee === 0 ? 'text-green-600 font-semibold' : ''
                    }
                  >
                    {deliveryFee === 0 ? 'FREE' : `$${deliveryFee}`}
                  </span>
                </div>

                {deliveryFee > 0 && (
                  <p className="text-sm text-gray-600">
                    Add ₹{(500 - subtotal).toLocaleString()} more for free
                    delivery
                  </p>
                )}

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold">
                  Proceed to Checkout
                </button>

                <div className="text-center">
                  <Link
                    href="/"
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
