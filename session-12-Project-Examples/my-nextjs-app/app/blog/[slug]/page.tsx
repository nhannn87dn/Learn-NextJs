
export default function Page({ params }: { params: { slug: string } }) {
  return <div>My Post: {params.slug}</div>
}

export async function generateStaticParams() {
  
  const posts = [
    {id: 1, slug: 'article-1'},
    {id: 2, slug: 'article-2'},
    {id: 3, slug: 'article-3'}
  ]
 
  return posts.map((post) => ({
    slug: post.slug,
  }))
}