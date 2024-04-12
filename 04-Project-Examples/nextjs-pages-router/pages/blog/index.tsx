import React from 'react'
import DefaultLayout from '@/components/layouts/DefaultLayout';

type TPosts = {
  id?: number;
  userId: number;
  body: string;
  title: string;

}

const Blog = ({ posts }: {posts: TPosts[]}) => {
  const time = new Date();
  return (
    <DefaultLayout>
        <h1 className='text-3xl font-bold'>Blog Page - </h1>
        <h2 className='text-2xl font-bold'>Server-side Rendering (SSR)</h2>
        <h3>{time.toISOString()}</h3>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
    </DefaultLayout>
  )
}

export default Blog


// This gets called on every request
// Mỗi lần mở trang là API được gọi lại
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
  const posts = await res.json();

  if (!posts) {
    return {
      notFound: true,
    }
  }
 
  // Pass data to the page via props
  return { props: { posts } }
}
