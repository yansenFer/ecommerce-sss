import { BannerLayout } from '@/components/layouts/BannerLayout'
import { FooterLayout } from '@/components/layouts/FooterLayout'
import { HeaderLayout } from '@/components/layouts/HeaderLayout'
import { CategoriesInit } from '@/components/initials/CategoriesInit'
import { ProductLayout } from '@/components/layouts/ProductLayout'
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
      return res.data
    }
    return []
  })

  return (
    <main className=" min-h-screen">
      <CategoriesInit categories={categories || []} />
      <HeaderLayout />
      <BannerLayout dataProducts={products || []} />
      <ProductLayout dataProduct={products || []} />
      <FooterLayout />
    </main>
  )
}
