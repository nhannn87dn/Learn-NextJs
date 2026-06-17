'use client'
import { use } from 'react'
//client component
type Categories = {
    category_id: string;
    category_name: string;
    slug: string;
}

type CategoriesResponse = {
    statusCode: number;
    message: string;
    data: Categories[];
}


const Categories = ({
    data 
}: 
{
    data:  Promise<CategoriesResponse> 

}) => {

    const cate = use(data)
    console.log('cate', cate)
  return (
    <div>
        <ul>
            {
              cate.data.map((category: {category_id: string, category_name: string}) => {
                return <li key={category.category_id}>
                  {category.category_name}
                </li>
              })
            }
          </ul>
    </div>
  )
}

export default Categories