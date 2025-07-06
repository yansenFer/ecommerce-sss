'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BsArrowLeft } from 'react-icons/bs'
import { FiMapPin, FiTruck } from 'react-icons/fi'
import { FaRegCreditCard } from 'react-icons/fa'
import { IoShieldSharp } from 'react-icons/io5'
import { FaRegClock } from 'react-icons/fa'
import { useSearchParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { ICart } from '@/interface'
import { getStorage } from '@/utils/getStorage'

export default function CheckoutPage() {
  const [selectedPayment, setSelectedPayment] = useState('card')
  const [selectedDelivery, setSelectedDelivery] = useState('standard')
  const listCartState = useSelector(
    (state: RootState) => state.getCart.listCart
  )
  const listCartLocalStorage = getStorage('cart', true)
  const searchParams = useSearchParams()
  const from = searchParams.get('from')

  // kalau listcart di state masih kosong, dia langsung ambil dari localstorage
  const cartItems: ICart[] =
    listCartState.length !== 0 ? listCartState : listCartLocalStorage

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  )
  const deliveryFee = subtotal > 500 ? 0 : 50
  const tax = Math.round(subtotal * 0.11)
  const total = subtotal + deliveryFee + tax

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href={from === 'cart' ? '/cart' : '/'}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <BsArrowLeft className="w-5 h-5" />
              <span>{from === 'cart' ? 'Back To Cart' : 'Back To Shop'}</span>
            </Link>
            <h1 className="text-2xl font-bold">Checkout</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-6">
                <FiMapPin className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold">Delivery Address</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    placeholder="Enter first name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    placeholder="Enter last name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="phone"
                    placeholder="Enter phone number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Street Address *
                  </label>
                  <input
                    id="address"
                    placeholder="Enter street address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    City *
                  </label>
                  <input
                    id="city"
                    placeholder="Enter city"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    State *
                  </label>
                  <input
                    id="state"
                    placeholder="Enter state"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="pincode"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    PIN Code *
                  </label>
                  <input
                    id="pincode"
                    placeholder="Enter PIN code"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="landmark"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Landmark (Optional)
                  </label>
                  <input
                    id="landmark"
                    placeholder="Enter landmark"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-4">
                <input
                  type="checkbox"
                  id="saveAddress"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="saveAddress" className="text-sm text-gray-700">
                  Save this address for future orders
                </label>
              </div>
            </div>

            {/* Delivery Options */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-6">
                <FiTruck className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold">Delivery Options</h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <input
                    type="radio"
                    value="standard"
                    id="standard"
                    name="delivery"
                    checked={selectedDelivery === 'standard'}
                    onChange={(e) => setSelectedDelivery(e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor="standard"
                      className="font-medium cursor-pointer"
                    >
                      Standard Delivery
                    </label>
                    <p className="text-sm text-gray-600">
                      5-7 business days • FREE
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 text-green-600">
                    <FaRegClock className="w-4 h-4" />
                    <span className="text-sm font-medium">FREE</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <input
                    type="radio"
                    value="express"
                    id="express"
                    name="delivery"
                    checked={selectedDelivery === 'express'}
                    onChange={(e) => setSelectedDelivery(e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor="express"
                      className="font-medium cursor-pointer"
                    >
                      Express Delivery
                    </label>
                    <p className="text-sm text-gray-600">1-2 business days</p>
                  </div>
                  <div className="flex items-center space-x-1 text-blue-600">
                    <FaRegClock className="w-4 h-4" />
                    <span className="text-sm font-medium">$99</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-6">
                <FaRegCreditCard className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold">Payment Method</h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <input
                    type="radio"
                    value="card"
                    id="card"
                    name="payment"
                    checked={selectedPayment === 'card'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor="card"
                      className="font-medium cursor-pointer"
                    >
                      Credit/Debit Card
                    </label>
                    <p className="text-sm text-gray-600">
                      Visa, Mastercard, RuPay
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
                      VISA
                    </div>
                    <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center">
                      MC
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <input
                    type="radio"
                    value="upi"
                    id="upi"
                    name="payment"
                    checked={selectedPayment === 'upi'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <label htmlFor="upi" className="font-medium cursor-pointer">
                      UPI Payment
                    </label>
                    <p className="text-sm text-gray-600">
                      Pay using UPI ID or QR code
                    </p>
                  </div>
                  <div className="text-blue-600 font-semibold text-sm">UPI</div>
                </div>

                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <input
                    type="radio"
                    value="wallet"
                    id="wallet"
                    name="payment"
                    checked={selectedPayment === 'wallet'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor="wallet"
                      className="font-medium cursor-pointer"
                    >
                      Digital Wallet
                    </label>
                    <p className="text-sm text-gray-600">
                      Paytm, PhonePe, Google Pay
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <input
                    type="radio"
                    value="cod"
                    id="cod"
                    name="payment"
                    checked={selectedPayment === 'cod'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <label htmlFor="cod" className="font-medium cursor-pointer">
                      Cash on Delivery
                    </label>
                    <p className="text-sm text-gray-600">
                      Pay when you receive
                    </p>
                  </div>
                  <span className="text-green-600 text-sm font-medium">
                    Available
                  </span>
                </div>
              </div>

              {/* Card Details Form */}
              {selectedPayment === 'card' && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label
                        htmlFor="cardNumber"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Card Number *
                      </label>
                      <input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="expiry"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Expiry Date *
                        </label>
                        <input
                          id="expiry"
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="cvv"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          CVV *
                        </label>
                        <input
                          id="cvv"
                          placeholder="123"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="cardName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Cardholder Name *
                      </label>
                      <input
                        id="cardName"
                        placeholder="Enter name on card"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* UPI Form */}
              {selectedPayment === 'upi' && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label
                      htmlFor="upiId"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      UPI ID *
                    </label>
                    <input
                      id="upiId"
                      placeholder="yourname@paytm"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm sticky top-4">
              <div className="p-6 border-b border-gray-300">
                <h2 className="text-xl font-semibold">Order Summary</h2>
              </div>

              {/* Order Items */}
              <div className="p-6 border-b border-gray-300">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="relative">
                        <Image
                          src={item.images[0] || '/no-image.png'}
                          alt={item.title}
                          width={60}
                          height={60}
                          className="w-15 h-15 object-contain rounded border"
                        />
                        <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs px-1 rounded-full">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.title}</h4>
                        <p className="font-semibold">
                          $
                          {(item.price * (item.quantity || 1)).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-6 space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className={deliveryFee === 0 ? 'text-green-600' : ''}>
                    {deliveryFee === 0 ? 'FREE' : `$${deliveryFee}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Tax 11%</span>
                  <span>${tax.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center space-x-2 text-green-600 text-sm mt-4">
                  <IoShieldSharp className="w-4 h-4" />
                  <span>Secure & encrypted payment</span>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold mt-6 rounded-md transition-colors">
                  Place Order • ${total.toLocaleString()}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By placing this order, you agree to our Terms & Conditions and
                  Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
