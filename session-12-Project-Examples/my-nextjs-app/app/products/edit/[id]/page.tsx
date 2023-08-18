// import type { Metadata, ResolvingMetadata } from "next";


import EditProduct from "@/components/EditProduct";



type PageProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

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


async function fetchProductByID(id: string){
  const product = await fetch(
    `https://64df2d7471c3335b2582313f.mockapi.io/api/v1/products/${id}`, {
      next: { revalidate: 30, tags: ['products-detail',id] },
    }
  ).then((res) => res.json());
    return product;
}


export async function generateMetadata(
  { params, searchParams }: PageProps
){

  // fetch data
  const product = await fetchProductByID(params.id)

  return {
    title: `Edit Product | ${product.name}`,
  };
}


export default async function Page({ params, searchParams }: PageProps) {

 const product =  await fetchProductByID(params.id);
 

  return (
    <>
      <EditProduct product={product} />
    </>
  )
}

export async function generateStaticParams() {
  const products: ProductType[] = await fetch(
    "https://64df2d7471c3335b2582313f.mockapi.io/api/v1/products"
  ).then((res) => res.json());

  //Cắt ra chỉ build 10 link bài viết
  const newProducts = products.slice(0, 10);

  return newProducts.map((product) => ({
    id: product.id.toString(),
  }));
}
