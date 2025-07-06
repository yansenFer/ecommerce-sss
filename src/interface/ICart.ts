import { ICategory } from './ICategory'

export interface ICart {
  id: number
  title: string
  slug: string
  price: number
  description: string
  category: ICategory
  images: string[]
  quantity?: number
}
