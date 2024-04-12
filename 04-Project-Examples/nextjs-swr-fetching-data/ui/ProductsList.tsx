"use client"

import Link from "next/link";
import useSWR, { mutate} from "swr";



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
  

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useProducts = () => {
   /***
    * Dùng useSWR để fetch với phương thức GET
    */
  const { data, isLoading, error } = useSWR<ProductType[]>(`https://64df2d7471c3335b2582313f.mockapi.io/api/v1/products`, fetcher);

  return { products: data, isLoading, error };
};


const ProductsList = () => {

    const {products, isLoading} = useProducts();

  return (
    <>
    <h1>Products Page</h1>
        {isLoading ? <div>Loading useProducts...</div> : null}
      <ul>
        {products && products.map((item) => {
          return (
            <li key={item.id}>
                {item.id} - {item.name} - {item.price}
              - <Link href={`/products/edit/${item.id}`}>Edit</Link>
            </li>
          );
        })}
      </ul>
    </>
  )
}

export default ProductsList