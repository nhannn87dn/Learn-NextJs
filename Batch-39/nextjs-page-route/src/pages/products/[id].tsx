import { useRouter } from "next/router";

type TProduct = {
  id: number;
  title: string;
  price: number;
};
export default function Page({ product }: { product: TProduct }) {
  const router = useRouter();
  return (
    <>
      <p>Product ID: {router.query.id}</p>
      <h1>{product?.title}</h1>
    </>
  );
}

// This function gets called at build time
//hàm này phải đi kèm với hàm getStaticProps để lấy data
//Các page sẽ được build thành site tĩnh khi build app
//Doc: https://nextjs.org/docs/pages/api-reference/functions/get-static-paths
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch("https://api.escuelajs.co/api/v1/products");
  const products: TProduct[] = await res.json();

  const shortProducts = products.slice(0, 20);
  //chỉ tạo 20 sản phẩm đầu tiên

  // Get the paths we want to pre-render based on posts
  const paths = shortProducts.map((product) => ({
    params: { id: product.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

/**
 * Khi nào bạn cần Cache lại kết quả
 * Gen thành file hTML tĩnh để tốc độ load NHANH thì dùng
 * + Kết hợp với revalidate: 60s để làm tươi dữ liệu
 */

export const getStaticProps = async ({
  params,
}: {
  params: { id: number };
}) => {
  const id = params.id;
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
  const product = await res.json();

  //notFound is not needed for fallback: false mode as only paths returned from getStaticPaths will be pre-rendered
  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: { product },
    //Sau 60s thì tự động gọi lại API để làm tươi dữ liệu
    revalidate: 60, // In seconds
  };
};
