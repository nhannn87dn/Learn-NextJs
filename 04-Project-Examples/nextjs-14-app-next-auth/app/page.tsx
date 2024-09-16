
import { auth } from "auth"

export default async function Index() {
  const session = await auth()

  return (
    <div className="flex flex-col gap-6">
      <h1>Home Page</h1>
    </div>
  )
}
