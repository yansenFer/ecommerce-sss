'use client'
import { ICart, IProduct } from '@/interface'
import { setCart } from '@/store/Slice/cartSlice'
import { addCommas, removeNonNumeric } from '@/utils/formatNumber'
import { getStorage } from '@/utils/getStorage'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

interface ProductCardProps {
  data: IProduct[]
  dataFilter?: IProduct[]
  isDataFilterOrSearch: boolean
  hasNextPage: boolean
}

export const ProductCard = ({
  data,
  isDataFilterOrSearch,
  hasNextPage,
  dataFilter,
}: ProductCardProps) => {
  const [isLoadImage, setIsLoadImage] = useState(true)
  const dispatch = useDispatch()
  //karena didokumentasi apinya tidak ada add cart, jadi sementara disimpan di local storage
  const handleAddCart = (product: IProduct) => {
    // dapetin list cart di local storage
    const cartProduct: ICart[] = getStorage('cart', true)

    // kalo ada id cart yang sama, ga di push tapi update quantitynya
    const isHaveId = cartProduct.some((cart) => cart.id === product.id)

    if (isHaveId) {
      const updatedCart = cartProduct.map((cart) =>
        cart.id === product.id
          ? { ...cart, quantity: (cart.quantity || 1) + 1 }
          : cart
      )
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      dispatch(setCart(updatedCart))
    } else {
      // kalau gk ada id yang sama, data product di push ke cart
      cartProduct.push({ ...product, quantity: 1 })
      localStorage.setItem('cart', JSON.stringify(cartProduct))
      dispatch(setCart(cartProduct))
    }
  }

  return isDataFilterOrSearch ? (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {data.map((product, idx) => (
          <Link
            key={idx}
            href={`/product/${product.id}`}
            className="bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="relative p-4">
              {isLoadImage && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" />
              )}
              <Image
                src={product.images[0] || '/no-image.png'}
                alt={product.title}
                width={150}
                height={200}
                loading="lazy" // ini default, tapi bisa eksplisit
                onLoadingComplete={() => setIsLoadImage(false)}
                className={`w-full h-48 rounded-lg object-contain mb-4 transition-opacity duration-300 ${
                  isLoadImage ? 'opacity-0' : 'opacity-100'
                }`}
              />

              <h3 className="font-medium line-clamp-1 text-sm mb-2">
                {product.title}
              </h3>
              <div className="space-y-1">
                <div className="flex flex-col gap-3 items-start justify-start space-x-2">
                  <span className="text-lg font-bold">
                    ${' '}
                    {addCommas(
                      removeNonNumeric(product.price.toString() || '0'),
                      false
                    )}
                  </span>
                  <button
                    onClick={() => handleAddCart(product)}
                    className="bg-green-700 text-white rounded-lg px-2 cursor-pointer items-center"
                  >
                    Add Cart
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  ) : (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {data?.map((product, idx) => (
          <Link
            href={`/product/${product.id}`}
            key={idx}
            className="bg-white rounded-lg shadow-md  hover:shadow-lg transition-shadow"
          >
            <div className="relative p-4">
              {isLoadImage && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" />
              )}
              <Image
                src={product.images[0] || '/no-image.png'}
                alt={product.title}
                width={150}
                height={200}
                loading="lazy" // ini default, tapi bisa eksplisit
                onLoadingComplete={() => setIsLoadImage(false)}
                className={`w-full h-48 object-contain mb-4 transition-opacity duration-300 ${
                  isLoadImage ? 'opacity-0' : 'opacity-100'
                }`}
              />

              <h3 className="font-medium line-clamp-1 text-sm mb-2">
                {product.title}
              </h3>
              <div className="space-y-1">
                <div className="flex flex-col gap-3 items-start justify-start space-x-2">
                  <span className="text-lg font-bold">
                    ${' '}
                    {addCommas(
                      removeNonNumeric(product.price.toString() || '0'),
                      false
                    )}
                  </span>
                  <button
                    onClick={() => handleAddCart(product)}
                    className="bg-green-700 text-white rounded-lg px-2 cursor-pointer items-center"
                  >
                    Add Cart
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
        {hasNextPage &&
          dataFilter?.length !== 0 &&
          dataFilter?.map((product, idx) => (
            <Link
              href={`/product/${product.id}`}
              key={idx}
              className="bg-white rounded-lg shadow-md  hover:shadow-lg transition-shadow"
            >
              <div className="relative p-4">
                {isLoadImage && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" />
                )}
                <Image
                  src={product.images[0] || '/no-image.png'}
                  alt={product.title}
                  width={150}
                  height={200}
                  loading="lazy" // ini default, tapi bisa eksplisit
                  onLoadingComplete={() => setIsLoadImage(false)}
                  className={`w-full h-48 object-contain mb-4 transition-opacity duration-300 ${
                    isLoadImage ? 'opacity-0' : 'opacity-100'
                  }`}
                />

                <h3 className="font-medium line-clamp-1 text-sm mb-2">
                  {product.title}
                </h3>
                <div className="space-y-1">
                  <div className="flex flex-col gap-3 items-start justify-start space-x-2">
                    <span className="text-lg font-bold">
                      ${' '}
                      {addCommas(
                        removeNonNumeric(product.price.toString() || '0'),
                        false
                      )}
                    </span>
                    <button
                      onClick={() => handleAddCart(product)}
                      className="bg-green-700 text-white rounded-lg px-2 cursor-pointer items-center"
                    >
                      Add Cart
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </>
  )
}
