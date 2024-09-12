"use client";
//Khai bao đâylà client component

import { useEffect, useState } from "react";

export default function Page({ params }: { params: { slug: string } }) {
  //Gọi api lấy thông tin sp theo slug
  const slug = params.slug;
  const [products, setProducts] = useState<TProduct | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:8080/api/v1/products/${slug}`);
      const data = await res.json();

      console.log(data);

      setProducts(data.data);
    };

    fetchData();
  }, [slug]);

  console.log(products);

  return (
    <>
      <h1>Product Detail by Slug Page</h1>
      <h2>{products?.product_name}</h2>
      <strong>{products?.price}</strong>
    </>
  );
}
