// import type { Metadata, ResolvingMetadata } from "next";

type PageProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

interface BlogType {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export async function generateMetadata(
  { params, searchParams }: PageProps
){


  // read route params
  const id = params.id;

  // fetch data
  const post = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  ).then((res) => res.json());

  return {
    title: post.title,
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const post = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  ).then((res) => res.json());

  return <div>My Post: {post.title}</div>;
}

export async function generateStaticParams() {
  const posts: BlogType[] = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  ).then((res) => res.json());

  //Cắt ra chỉ build 10 link bài viết
  const newPost = posts.slice(0, 10);

  return newPost.map((post) => ({
    id: post.id.toString(),
  }));
}
