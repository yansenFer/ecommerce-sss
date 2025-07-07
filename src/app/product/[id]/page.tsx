import { DetailProductLayout } from '@/components/layouts/DetailProductLayout'
import { IProduct } from '@/interface'
import { networkHelper } from '@/utils/networkHelper'
import { resourceUrl } from '@/utils/url'

export type paramsType = Promise<{ id: string }>

export default async function ProductDetailPage(props: { params: paramsType }) {
  const { id } = await props.params
  console.log(id)
  const product: IProduct = await networkHelper({
    resource: resourceUrl.resource.product.read,
    id: id,
  }).then((res) => {
    if (res.status === 200) {
      return res.data
    }
    return []
  })

  return <DetailProductLayout product={product || {}} />
}
