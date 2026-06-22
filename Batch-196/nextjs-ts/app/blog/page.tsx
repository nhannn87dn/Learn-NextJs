//server component

import Categories from "@/components/Categories"
import { Metadata } from "next"
import { Suspense } from "react"

//hàm fetch data từ API backend
const getCategories = async () => {
  const res = await fetch('http://localhost:8080/api/v1/categories/tree')
  return res.json()
}

export const metadata: Metadata = {
  title: 'Blog page',
  description: '...',
}
 

const BlogPage = () => {

  const categories = getCategories()
  console.log(categories)

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Categories data={categories} />
    </Suspense>
  )
}

export default BlogPage