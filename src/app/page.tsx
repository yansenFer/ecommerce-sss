import { BannerLayout } from '@/components/BannerLayout'
import { FooterLayout } from '@/components/FooterLayout'
import { HeaderLayout } from '@/components/HeaderLayout'
import { ProductLayout } from '@/components/ProductLayout'

export default function Home() {
  console.log(process.env.API_KEY, 'testing kepanggil ga')
  return (
    <main className=" min-h-screen">
      <HeaderLayout />
      <BannerLayout />
      <ProductLayout />
      <FooterLayout />
    </main>
  )
}
