'use client'

import { IProduct } from '@/interface'
import { networkHelper } from '@/utils/networkHelper'
import { resourceUrl } from '@/utils/url'
import { useInfiniteQuery, QueryFunctionContext } from '@tanstack/react-query'
import { LoadingDots } from '../loading/loading'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { ProductCard } from '../cards/ProductCard'

interface ProductProps {
  dataProduct?: IProduct[]
}

export const ProductLayout = ({ dataProduct }: ProductProps) => {
  const filterCategory = useSelector(
    (state: RootState) => state.getProduct.filterCategory
  )
  const searchProduct = useSelector(
    (state: RootState) => state.getProduct.search
  )

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
        ...(filterCategory.id && { categoryId: filterCategory.id }),
        ...(searchProduct && { title: searchProduct }),
      },
    })

    if (res.status === 200) {
      return res.data as IProduct[]
    }

    return []
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<IProduct[], Error>({
      queryKey: ['products', filterCategory, searchProduct],
      queryFn: fetchingProduction,
      //kalau ada filter, page panggil dari awal
      initialPageParam: filterCategory ? 0 : 1,
      getNextPageParam: (lastPage, allPages) => {
        return allPages.length + 1
      },
      enabled: filterCategory.id || searchProduct ? true : false,
    })

  const handleListProduct = () => {
    // kalau ada filter category atau search, list product diambil dari data tanstack query metode CSR
    if (
      (filterCategory.id !== 0 && filterCategory.id !== undefined) ||
      searchProduct
    ) {
      return (
        <ProductCard
          data={data?.pages.flat() || []}
          hasNextPage={hasNextPage}
          isDataFilterOrSearch
        />
      )
    } else {
      return (
        <ProductCard
          data={dataProduct || []}
          hasNextPage={hasNextPage}
          isDataFilterOrSearch={false}
          dataFilter={data?.pages.flat()}
        />
      )
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">
          All <span className="text-blue-600">Product</span>
          {filterCategory.name && `: ${filterCategory.name}`}
        </h2>
      </div>
      {/* list product */}

      {handleListProduct()}
      {isFetchingNextPage && <LoadingDots />}

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
