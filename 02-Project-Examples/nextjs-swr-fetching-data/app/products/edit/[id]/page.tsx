import ProductEdit from "@/ui/ProductEdit"
import useSWR from "swr";


type PageProps = {
  params: { id: string }
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

const Page = async ({ params }: PageProps) => {
    const {id} = params;
    return (
    <>
    <ProductEdit productId={parseInt(id)} />
    </>
  )
}

export default Page



export async function generateStaticParams() {
  const products: ProductType[] = await fetch(
    "https://64df2d7471c3335b2582313f.mockapi.io/api/v1/products"
  ).then((res) => res.json());


  return products.map((product) => ({
    id: product.id.toString(),
  }));
}
