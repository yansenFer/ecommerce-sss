import { BannerLayout } from '@/components/BannerLayout'
import { FooterLayout } from '@/components/FooterLayout'
import { HeaderLayout } from '@/components/HeaderLayout'
import { ProductLayout } from '@/components/ProductLayout'
import { IProduct } from '@/interface'
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
  console.log(products, 'testing kepanggil ga')
  return (
    <main className=" min-h-screen">
      <HeaderLayout />
      <BannerLayout dataProducts={products || []} />
      <ProductLayout />
      <FooterLayout />
    </main>
  )
}
