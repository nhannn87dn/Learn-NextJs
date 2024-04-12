import React from 'react'
import DefaultLayout from '@/components/layouts/DefaultLayout';
import { useRouter } from 'next/router';


type ProductType = {
  id: number;
  title: string;
  price: number
}

const ProductDetails = ({product}: {product: ProductType}) => {

  const router = useRouter();
  const productID = router.query.id;
  /**
   * Chúng ta ko lấy ID và đi fetch data bằng userEffect ở đây trong NextJS
   * Dữ liệu sẽ lấy thông qua getStaticProps bên dưới
   */
  const time = new Date();
  return (
    <DefaultLayout>
        <h1 className='text-3xl font-bold'>Product Details Page</h1>
        <h2>ID Product: {productID}</h2>
        <h3>{time.toISOString()}</h3>
        <div>
          <h3>Name: {product.title}</h3>
          <p>Price: <strong>$ {product.price}</strong></p>
        </div>
    </DefaultLayout>
  )
}

export default ProductDetails


// This function gets called at build time
//hàm này phải đi kèm với hàm getStaticProps để lấy data
//Các page sẽ được build thành site tĩnh khi build app
//Doc: https://nextjs.org/docs/pages/api-reference/functions/get-static-paths
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://api.escuelajs.co/api/v1/products')
  const products: ProductType[] = await res.json();


  const shortProducts = products.slice(0, 20);
  //chỉ tạo 20 sản phẩm đầu tiên
 
  // Get the paths we want to pre-render based on posts
  const paths = shortProducts.map((product) => ({
    params: { id: product.id.toString()},
  }))
 
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}


// This function gets called at build time
//Doc: https://nextjs.org/docs/pages/api-reference/functions/get-static-props
export async function getStaticProps({ params }: {params: any}) {
  // Call an external API endpoint to get posts
  const id = params.id;
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
  const product = await res.json();

  console.log(product)
  

  //notFound is not needed for fallback: false mode as only paths returned from getStaticPaths will be pre-rendered
  if (!product) {
    return {
      notFound: true,
    }
  }


  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      product,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 60*3, // In seconds
  }
}