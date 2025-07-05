'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ICategory } from '@/interface'
import { setCategory } from '@/store/Slice/categorySlice'

export function CategoriesInit({ categories }: { categories: ICategory[] }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCategory(categories))
  }, [dispatch, categories])

  return null
}
