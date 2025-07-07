'use client'
import { ICart, IProduct } from '@/interface'
import Link from 'next/link'
import {
  FiArrowLeft,
  FiMinus,
  FiPlus,
  FiShoppingCart,
  FiHeart,
  FiShare2,
  FiTruck,
  FiRotateCcw,
  FiShield,
} from 'react-icons/fi'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { setCart } from '@/store/Slice/cartSlice'
import { getStorage } from '@/utils/getStorage'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'

interface detailProductLayoutProps {
  product: IProduct
}
export const DetailProductLayout = ({ product }: detailProductLayoutProps) => {
  const route = useRouter()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [cartProduct, setCartProduct] = useState<ICart[]>([])
  const listCartState = useSelector(
    (state: RootState) => state.getCart.listCart
  )
  const dispatch = useDispatch()

  useEffect(() => {
    const cartProduct: ICart[] = getStorage('cart', true)
    setCartProduct(cartProduct)
  }, [listCartState])

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  //karena didokumentasi apinya tidak ada add cart, jadi sementara disimpan di local storage
  const handleAddCart = (product: IProduct, quantity: number) => {
    // dapetin list cart di local storage

    // kalo ada id cart yang sama, ga di push tapi update quantitynya
    const isHaveId = cartProduct.some((cart) => cart.id === product.id)

    if (isHaveId) {
      const updatedCart = cartProduct.map((cart) =>
        cart.id === product.id
          ? { ...cart, quantity: (cart.quantity || 1) + quantity }
          : cart
      )
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      dispatch(setCart(updatedCart))

      route.replace('/cart')
    } else {
      // kalau gk ada id yang sama, data product di push ke cart
      cartProduct.push({ ...product, quantity: quantity })
      localStorage.setItem('cart', JSON.stringify(cartProduct))
      dispatch(setCart(cartProduct))

      route.replace('/cart')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <FiArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <Image
                src={product.images[selectedImage] || '/no-image.png'}
                alt={product.title}
                width={600}
                height={600}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2">
              {product.images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg border-2 overflow-hidden ${
                    selectedImage === index
                      ? 'border-blue-500'
                      : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={image || '/no-image.png'}
                    alt={`${product.title} ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-green-600">
                ${product.price.toLocaleString()}
              </span>
            </div>
            {/* Description */}
            <div>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-900">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => updateQuantity(quantity - 1)}
                    className="h-10 w-10 flex items-center justify-center cursor-pointer"
                  >
                    <FiMinus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      updateQuantity(Number.parseInt(e.target.value) || 1)
                    }
                    className="w-16 h-10 text-center border-0 focus:outline-none"
                    min="1"
                  />
                  <button
                    onClick={() => updateQuantity(quantity + 1)}
                    className="h-10 w-10 flex items-center justify-center cursor-pointer"
                  >
                    <FiPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => handleAddCart(product, quantity)}
                  className="flex-1 cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
                >
                  <FiShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    isWishlisted
                      ? 'border-red-500 bg-red-50 text-red-500'
                      : 'border-gray-300 hover:border-red-500 hover:text-red-500'
                  }`}
                >
                  <FiHeart
                    className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`}
                  />
                </button>
                <button className="p-3 rounded-lg border-2 border-gray-300 hover:border-blue-500 hover:text-blue-500 transition-colors">
                  <FiShare2 className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <FiTruck className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">Free Delivery</p>
                  <p className="text-sm text-gray-600">On orders above $500</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FiRotateCcw className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Easy Returns</p>
                  <p className="text-sm text-gray-600">30-day return policy</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FiShield className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-900">Secure Payment</p>
                  <p className="text-sm text-gray-600">
                    100% secure transactions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
