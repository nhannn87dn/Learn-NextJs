import React from 'react'
import DefaultLayout from '@/components/layouts/DefaultLayout';
import Link from 'next/link';

type ProductType = {
  id: number;
  title: string;
  price: number
}

const Products = ({products}: {products: ProductType[]}) => {

  
  return (
    <DefaultLayout>
        <h1 className='text-3xl font-bold'>Products List Page</h1>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <Link href={`/products/${product.id}`}>{product.id} - {product.title} - ${product.price}</Link>
              </li>
          ))}
        </ul>
    </DefaultLayout>
  )
}

export default Products



// This function gets called at build time
//Doc: https://nextjs.org/docs/pages/api-reference/functions/get-static-props
export async function getStaticProps({ params }: {params: any}) {
  // Call an external API endpoint to get posts
  const currentPage = 1;
  const recordPerPage = 10;
  const offset = (currentPage - 1) * currentPage;
  const res = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${recordPerPage}`)
  const products = await res.json();

  console.log(products)
  

  //notFound is not needed for fallback: false mode as only paths returned from getStaticPaths will be pre-rendered
  if (!products) {
    return {
      notFound: true,
    }
  }

  const shortProducts = products.slice(0, 20);
  //Cắt bớt chỉ giữ lại 20 sản phẩm để tạo site tĩnh ==> cho việc test

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      products: shortProducts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 60, // In seconds
  }
}