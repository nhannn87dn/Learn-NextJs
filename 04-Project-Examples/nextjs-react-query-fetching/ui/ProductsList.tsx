"use client"

import Link from "next/link";
import { useQuery } from '@tanstack/react-query';

interface ProductType {
  id: string;
  name: string;
  price: string;
  desc: string;
  createdAt: string;
  meterial: string;
  catId: string;
  slug: string;
}



const ProductsList = () => {

  const fetchData = async ()=>{
    let url = `https://64df2d7471c3335b2582313f.mockapi.io/api/v1/products`;
    return fetch(url).then(res => res.json())
  }
  
  
  // Sử dụng useQuery để fetch data từ API
  const queryData = useQuery<ProductType[], Error>({ 
     queryKey: ['products'], 
     queryFn: fetchData
 });


  return (
    <>
    <h1 className="text-2xl text-bold">Products Page</h1>
        {queryData.isLoading ? <div>Loading useProducts...</div> : null}
        {queryData.isError && queryData.error ? <div>{queryData.error.toString()}</div>: null}
      <ul>
        {queryData.data && queryData.data.map((item) => {
          return (
            <li className="my-2" key={item.id}>
                {item.id} - {item.name} - ${item.price}
              - <Link href={`/products/edit/${item.id}`}>Edit</Link>
            </li>
          );
        })}
      </ul>
    </>
  )
}

export default ProductsList