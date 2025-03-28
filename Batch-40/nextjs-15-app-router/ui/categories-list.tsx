'use client'

import { use } from "react";

export default function CategoriesList(
    {
        categories,
      }: {
        categories: Promise<{ id: number; name: string }[]>
      }
) {

    const allCategories = use(categories)
  return (
    <div>
        <ul>
      {allCategories.map((cat) => (
        <li key={cat.id}>{cat.name}</li>
      ))}
    </ul>
    </div>
  )
}
