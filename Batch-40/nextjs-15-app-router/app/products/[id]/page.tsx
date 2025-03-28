import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: number }>
}

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  slug: string;
  description: string;
}

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60
 
// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true // or false, to 404 on unknown paths


export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  // read route params
  const { id } = await params
  //gọi api de lay thong tin sản phẩm
  const res = await fetch(
    `https://api.escuelajs.co/api/v1/products/${id}`,
    {
      cache: 'force-cache',
    }
  );
    const product: Product = await res.json();
 
  return {
    title: product.title,
    description: product.description,
  }
}

export default async function ProductDetails({params}: Props) {
    const { id } = await params;
    //fetch product details with id
    const res = await fetch(
      `https://api.escuelajs.co/api/v1/products/${id}`,
      {
        cache: 'force-cache',
      }
    );
    const product: Product = await res.json();
    console.log('<<=== 🚀 product ===>>',product);
    if(res.status === 400){
        notFound();
    }
    if(res.status === 500){
      return {message: 'Internal Server Error'};
    }
    
  return (
    <div>
      <h1>ProductDetails - {id}</h1>
      <h2>{product.title}</h2>
      <p>{product.price}</p>
      <script src=""></script>
    </div>
  )
}
