import { getServerAuthSession } from "@/auth"


export default async function CustomerProfilePage() {
  const authSession = await getServerAuthSession(); //(1) 

  console.log(authSession)
  return (
    <div>
      <h1>Customer Profile</h1>
      <ul>
        <li>{authSession?.user?.name}</li>
      </ul>
    </div>
  )
}
