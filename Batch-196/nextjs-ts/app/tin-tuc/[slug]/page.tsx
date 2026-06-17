
const PostDetail = async ({params}: {params: Promise<{ slug: string }>}) => {
  const { slug } = await params;
  
  return (
    <div>Post Detail for {slug}</div>
  )
}

export default PostDetail