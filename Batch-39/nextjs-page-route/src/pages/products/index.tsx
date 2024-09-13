import Link from "next/link";

type TProduct = {
  id: number;
  title: string;
  price: number;
};

export default function ProductPage({ products }: { products: TProduct[] }) {
  console.log("products", products);
  return (
    <div>
      ProductPage
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>
              {product.title} - {product.price}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Khi nào bạn cần dữ liệu được cập nhật
 * thường xuyên, nhanh chóng thì dùng
 * Nhưng nó CHẬM
 */

export async function getServerSideProps() {
  const res = await fetch(
    "https://api.escuelajs.co/api/v1/products?offset=0&limit=10"
  );
  const products = await res.json();

  if (!products) {
    return {
      notFound: true,
    };
  }

  return {
    props: { products }, // will be passed to the page component as props
  };
}
