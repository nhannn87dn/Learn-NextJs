//Server component
type TProduct = {
  id: string;
  _id: string;
  product_name: string;
  price: number;
};
import { Metadata } from "next";
import Link from "next/link";


//Meta title tĩnh, cố định
export const metadata: Metadata = {
  title: "Product page",
  description: "product page description",
};


//Render từ phía server
export default async function Page() {
  //Sau 60 giây thì API sẽ đc gọi lại để làm tươi dữ liệu
  const data = await fetch("http://localhost:8080/api/v1/products", {
    next: { revalidate: 60 }, //đơn vị giây
  });
  // const data = await fetch("http://localhost:8080/api/v1/products");
  const products = await data.json();

  //Log này bạn xem ở terminal của server
  console.log(products);

  if (!data.ok) {
    return "There was an error.";
  }

  return (
    <>
      <h1>Product Page</h1>
      <ul>
        {products &&
          products.data.products_list.length > 0 &&
          products.data.products_list.map((p: TProduct) => {
            return (
              <li key={p.id}>
                <Link href={`/products/${p._id}`}>
                  {p.product_name} - {p.price}
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
}
