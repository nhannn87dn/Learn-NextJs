import CategoriesList from "@/ui/categories-list";
import { getCategories } from "../lib/api"


export default function Page() {
    const categories = getCategories();
  return (
    <div>
        <h1>Categories</h1>
        <p>Pass data xuống client component</p>
        <CategoriesList categories={categories} />
    </div>
  )
}
