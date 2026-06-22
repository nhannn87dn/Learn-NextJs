'use client'
import { use } from 'react'
//client component
type Categories = {
    _id: string;
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
    <>
        <ul>
            {
              cate.data.map((category: {_id: string, category_name: string}) => {
                return <li key={category._id}>
                  {category.category_name}
                </li>
              })
            }
          </ul>
    </>
  )
}

export default Categories