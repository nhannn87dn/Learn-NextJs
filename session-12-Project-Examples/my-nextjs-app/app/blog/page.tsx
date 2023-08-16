import Link from "next/link";

export default function Blog() {
    return (
      <>
      <h1>Blog Page</h1>
        <ul>
          <li>
            <Link href='/blog/article-1'>bài 1</Link>
          </li>
          <li>
            <Link href='/blog/article-2'>bài 2</Link>
          </li>
          <li>
            <Link href='/blog/article-3'>bài 3</Link>
          </li>
        </ul>
      </>
    )
  }