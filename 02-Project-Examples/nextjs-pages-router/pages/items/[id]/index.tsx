import { useRouter } from 'next/router'

export default function ProductDetails() {
  const router = useRouter()
return <p>ID Product: {router.query.id}</p>