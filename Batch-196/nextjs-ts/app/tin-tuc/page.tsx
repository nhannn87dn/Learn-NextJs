
const PostList = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: number, limit: number }>
}) => {
  const { page, limit } = await searchParams;

  return (
    <div>
        <h1>Danh sách bài viết - Trang {page} - Giới hạn {limit}</h1>
        <ul>
            <li>Bài viết 1</li>
            <li>Bài viết 2</li>
            <li>Bài viết 3</li>
            <li>Bài viết 4</li>
            <li>Bài viết 5</li>
        </ul>
    </div>
  )
}

export default PostList