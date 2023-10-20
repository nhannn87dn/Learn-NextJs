import dbConnect from "@/db/dbConnect";
import Todo from "@/models/Todo";
import { revalidatePath } from 'next/cache';


type TodoRepository = {
    _id: string;
    title: string
}



export async function getTodos() {
    try {
        await dbConnect();
        const todos: TodoRepository[] = await Todo.find();

        console.log(todos);
      
      return { todos };
    } catch (error) {
      return { error };
    }
  }

export async function createTodo(formData: FormData) {

    try {
      console.log(formData.get('title'));
        await dbConnect();
        const todo = await Todo.create({
        title: formData.get('title')
       });
       revalidatePath('/todos')
      return { todo };
    } catch (error) {
      return { error };
    }
  }