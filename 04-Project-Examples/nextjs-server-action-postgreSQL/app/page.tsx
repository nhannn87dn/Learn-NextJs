import { sql } from '@vercel/postgres'
import { AddForm } from '@/app/add-form'
import { DeleteForm } from '@/app/delete-form'
import Link from 'next/link'

export const runtime = 'edge'
export const preferredRegion = 'home'

export default async function Home() {
  let data = await sql`SELECT * FROM todos`
  const { rows: todos } = data

  return (
    <main>
      <h1 className="sr-only">Todos</h1>
      <AddForm />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <DeleteForm id={todo.id} todo={todo.text} />
          </li>
        ))}
      </ul>
      <div className="my-5">
          <Link href={'/todos'}>Todos List</Link>
      </div>
    </main>
  )
}
