import { BannerLayout } from '@/components/BannerLayout'
import { FooterLayout } from '@/components/FooterLayout'
import { HeaderLayout } from '@/components/HeaderLayout'
import { CategoriesInit } from '@/components/Init/CategoriesInit'
import { ProductLayout } from '@/components/ProductLayout'
import { ICategory, IProduct } from '@/interface'
import { networkHelper } from '@/utils/networkHelper'
import { resourceUrl } from '@/utils/url'

export default async function Home() {
  const products: IProduct[] = await networkHelper({
    resource: resourceUrl.resource.product.read,
    data: {
      offset: 0,
      limit: 20,
    },
  }).then((res) => {
    if (res.status === 200) {
      return res.data
    }
    return []
  })

  const categories: ICategory[] = await networkHelper({
    resource: resourceUrl.resource.categories.read,
  }).then((res) => {
    if (res.status === 200) {
      console.log(res.data, 'ini isinya apa')
      return res.data
    }
    return []
  })

  return (
    <main className=" min-h-screen">
      <CategoriesInit categories={categories} />
      <HeaderLayout />
      <BannerLayout dataProducts={products || []} />
      <ProductLayout />
      <FooterLayout />
    </main>
  )
}
