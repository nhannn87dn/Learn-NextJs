import Link from "next/link";

interface Category {
    id: number;
    name: string;
    slug: string;
  }
export default async function ServerComponent() {
    const res = await fetch(
      'https://api.escuelajs.co/api/v1/categories',
      {
        next: { revalidate: 60 }, // 60 seconds
        cache: 'force-cache', // --> bật chế độ cache
      }
    );
  const data: Category[] = await res.json();
  console.log(data);
  console.log("Home page");
  return (
    <div>
        server-component
        <ul>
        {
        data.length > 0 && data.map((cat)=>{
          return (
            <li key={cat.id}>
              <Link href={`/category/${cat.id}`}>{cat.name}</Link>
            </li>
          )
        })
      }
        </ul>
    </div>
  )
}
