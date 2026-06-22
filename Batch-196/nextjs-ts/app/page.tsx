import HomePromotionProducts from "@/components/HomePromotionProducts";
import { Metadata } from "next";
import Image from "next/image";


export const metadata: Metadata = {
  title: 'Home page',
  description: '...',
}
 

//server component
export default async function Home() {
  //gọi api lấy danh sách categories tree
  const response = await fetch('http://localhost:8080/api/v1/categories/tree');
  const data = await response.json();

  return (
    <main className="container mx-auto my-4">
      <section className="flex">
        <aside className="w-1/4 bg-gray-100 p-4">
          {/* categories tree */}
          <ul>
            {
              data.data.map((category: {category_id: string, category_name: string}) => {
                return <li key={category.category_id}>
                  {category.category_name}
                </li>
              })
            }
          </ul>
        </aside>
        <div className="flex-1 p-4">
          {/* <Image 
          width={500}
          height={500} 
          src="/images/bi.png" 
          alt="Banner"
        /> */}
        <Image width={1200} height={260} alt="banner" src={'https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/c5/ce/c5cea0c172ff6881c045e8a8ac41f097.png'}  />
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">Danh sách sản phẩm Khuyễn mãi</h2>
        <HomePromotionProducts /> {/* server component */}
      </section>

    </main>
  );
}
