import Button from "@/ui/Button";
import ServerComponent from "@/ui/server-component";
import Image from "next/image";
import Link from "next/link";


import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Home page',
  description: 'Home page description',
}

// Trang chủ : http://localhost:3000/
export default async function Home() {
//fetch data from api in server component
  
  console.log("Home page");

  return (
    <main>
      <div className="container mx-auto">
      <h1 className="font-bold text-2xl">Hello world</h1>
      </div>
      <hr />
      <h2>insert local images to nextjs</h2>
      {/* <img src="/images/oppo-a38-black-thumb-600x600.jpg" alt="nextjs" /> */}
      <Image width={600} height={600} src={'/images/oppo-a38-black-thumb-600x600.jpg'} alt="nextjs" />
      <hr />
      <h2>Remote Images</h2>
      <Image width={600} height={600} src={'https://cdnv2.tgdd.vn/mwg-static/tgdd/Products/Images/5697/333734/hikvision-ds-d5024f2-bp2-23-8-inch-fhd-ips-100hz-5ms-den-thumb-638712365306831254-600x600.jpg'} alt="nextjs" />

      <hr />
      <Link href={`/about`}>Go To About</Link>
      {/* Embed client component inside server component */}
      <Button />
      <hr />
      <ServerComponent />
      <hr />
      
    </main>
  );
}
