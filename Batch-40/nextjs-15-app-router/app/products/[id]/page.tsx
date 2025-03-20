
export default async function ProductDetails({
    params
}: {
    params: Promise<{ id: number }>
}) {
    const { id } = await params
  return (
    <div>ProductDetails - {id}</div>
  )
}
