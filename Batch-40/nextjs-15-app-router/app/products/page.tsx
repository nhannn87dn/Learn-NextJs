import Link from "next/link";

//URL: localhost:3000/products
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  slug: string;
}
export default async function Page() {
  const res = await fetch('https://api.escuelajs.co/api/v1/products');
  const products: Product[] = await res.json();
  return (
    <div>
      <h1>Products</h1>
      {products.length > 0 && products.map((product) => (
        <Link href={`/products/${product.id}`} key={product.id}>
          <h2>{product.title}</h2>
          <p>{product.price}</p>
        </Link>
      ))}
    </div>
  )
}
