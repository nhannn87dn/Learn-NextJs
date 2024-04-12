import AddForm from "@/ui/AddForm";
import Link from "next/link";

function Page() {
  return (
    <div className="text-center">
      <h1>Add Todo</h1>
      <h2><Link href={'/todos'}>Danh sách</Link></h2>
        <AddForm />
    </div>
  )
}

export default Page