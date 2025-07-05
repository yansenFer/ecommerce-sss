import { BannerLayout } from '@/components/BannerLayout'
import { FooterLayout } from '@/components/FooterLayout'
import { HeaderLayout } from '@/components/HeaderLayout'
import { ProductLayout } from '@/components/ProductLayout'

export default function Home() {
  return (
    <main className=" min-h-screen">
      <HeaderLayout />
      <BannerLayout />
      <ProductLayout />
      <FooterLayout />
    </main>
  )
}
