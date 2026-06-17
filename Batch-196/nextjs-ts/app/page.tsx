//server component
export default async function Home() {
  //gọi api lấy danh sách categories tree
  const response = await fetch('http://localhost:8080/api/v1/categories/tree');
  const data = await response.json();

  return (
    <main className="container mx-auto my-4">
      <div className="flex">
        <aside className="w-1/4 bg-gray-100 p-4">
          {/* categories tree */}
          <ul>
            {
              data.data.map((category: {category_id: string, category_name: string}) => {
                return <li key={category.category_id}>
                  {category.category_name}
                </li>
              })
            }
          </ul>
        </aside>
        <div className="flex-1 p-4">
          Banner
        </div>
      </div>

    </main>
  );
}
