import Link from "next/link";

// Trang chủ : http://localhost:3000/
export default function Home() {

  console.log("Home page");

  return (
    <main>
      <div className="container mx-auto">
      <h1 className="font-bold text-2xl">Hello world</h1>
      </div>
      <Link href={`/about`}>Go To About</Link>
    </main>
  );
}
