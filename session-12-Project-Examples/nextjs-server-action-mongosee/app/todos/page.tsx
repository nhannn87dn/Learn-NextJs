import Link from "next/link";
import { getTodos } from "@/actions/todos";



const Page = async () => {

    const {todos} = await getTodos();

  return (
    <div className='container mx-auto'>
        <h1 className='text-5xl'>Todos List</h1>
        <ul>
            {
                todos && todos.map((todo)=> {
                    return <li key={todo._id}>{todo._id.toString()}-{todo.title}</li>
                })
            }
        </ul>
        <Link href={'/todos/add'}>Thêm Todo</Link>
    </div>
  )
}

export default Page