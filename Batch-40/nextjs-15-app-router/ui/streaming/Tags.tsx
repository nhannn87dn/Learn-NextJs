interface Tags {
    id: number;
    name: string;
    slug: string;
}
export default async function Tags() {
    const response = await fetch('https://dummyjson.com/posts/tags')
    const tags: Tags[] = await response.json();
  return (
    <div>
        <h3>Tags</h3>
        <ul>
            {tags.length > 0 && tags.map((tag) => (
                <li key={tag.slug}>
                    <h2>{tag.name}</h2>
                </li>
            ))}
        </ul>
    </div>
  )
}
