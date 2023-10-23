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
                    return <li className="my-2" key={todo._id}>{todo._id.toString()}-{todo.title}</li>
                })
            }
        </ul>
        <Link className="bg-sky-500 py-2 px-3 text-white rounded" href={'/todos/add'}>Thêm Todo</Link>
    </div>
  )
}

export default Page