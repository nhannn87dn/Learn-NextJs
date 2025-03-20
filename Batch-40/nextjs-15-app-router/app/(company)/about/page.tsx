'use client';

import { useRouter } from "next/navigation";
export default function About() {

  const router = useRouter();
  console.log('About page');
  return (
    <div>
      <h1>About</h1>
      <button type="button" onClick={() => router.push("/")}>
      Home
    </button>
    </div>
  )
}
