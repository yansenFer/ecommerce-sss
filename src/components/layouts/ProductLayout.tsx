'use client'

import { IProduct } from '@/interface'
import { addCommas, removeNonNumeric } from '@/utils/formatNumber'
import { networkHelper } from '@/utils/networkHelper'
import { resourceUrl } from '@/utils/url'
import { useInfiniteQuery, QueryFunctionContext } from '@tanstack/react-query'
import Image from 'next/image'
import { useState } from 'react'
import { LoadingDots } from '../loading/loading'

interface ProductProps {
  dataProduct?: IProduct[]
}

export const ProductLayout = ({ dataProduct }: ProductProps) => {
  const [isLoadImage, setIsLoadImage] = useState(true)

  const fetchingProduction = async (
    context: QueryFunctionContext
  ): Promise<IProduct[]> => {
    const pageParam = (context.pageParam ?? 0) as number

    const res = await networkHelper({
      resource: resourceUrl.resource.product.read,
      isSSR: false,
      data: {
        offset: pageParam,
        limit: 20,
      },
    })

    if (res.status === 200) {
      return res.data as IProduct[]
    }

    return []
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<IProduct[], Error>({
      queryKey: ['products'],
      queryFn: fetchingProduction,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        // misalnya: kalau jumlah data terakhir < 20 berarti udah habis
        return allPages.length + 1
      },
      enabled: false,
    })

  console.log(data?.pages, '<<<<<<<<<<<<<<')

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">
          All <span className="text-blue-600">Product</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {dataProduct?.map((product) => (
          <div
            key={product.id}
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
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold">
                    ${' '}
                    {addCommas(
                      removeNonNumeric(product.price.toString() || '0'),
                      false
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {hasNextPage &&
          data?.pages.length !== 0 &&
          data?.pages.flat().map((product, idx) => (
            <div
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
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold">
                      ${' '}
                      {addCommas(
                        removeNonNumeric(product.price.toString() || '0'),
                        false
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {isFetchingNextPage && (
        <div className=" mt-10 flex w-full justify-center">
          <LoadingDots />
        </div>
      )}
      <div className="flex w-full justify-center">
        <button
          onClick={() => fetchNextPage()}
          className="mt-10 rounded-lg border hover:shadow-md transition-all hover:bg-gray-50 w-fit py-2 cursor-pointer px-30 min-w-fit border-blue-600 flex justify-center bg-white "
        >
          <span className="font-medium text-center text-blue-600 line-clamp-1">
            Load More
          </span>
        </button>
      </div>
    </section>
  )
}
