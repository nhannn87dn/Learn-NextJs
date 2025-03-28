
interface Post {
    id: number;
    title: string;
    body: string;
}
export default async function PostList() {
    // Fetch data from API
    const response = await fetch('https://dummyjson.com/posts')
    const data: {
        posts: Post[];
    } = await response.json();
    console.log('<<=== 🚀 posts ===>>',data);
  return (
    <div>
        PostLi
        {/* This content will be sent to the client immediately */}
        <ul>
            {data.posts.length > 0 && data.posts.map((post) => (
                <li key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                </li>
            ))}
        </ul>
    </div>
  )
}
