
import {Schema, model, models} from 'mongoose'

interface ITodo{
  title: string
  done: boolean
}

/* TodoSchema will correspond to a collection in your MongoDB database. */
const TodoSchema = new Schema<ITodo>({
  title: {
    type: String,
    required: [true, 'Please provide a name for this Todo.'],
    maxLength: [60, 'Name cannot be more than 60 characters'],
  },
  done: {
    type: Boolean,
    enum: ['true', 'false'],
    default: false
  }
},
{
  timestamps: false
}

)

const Todo = models.Todo || model<ITodo>('Todo', TodoSchema);

export default Todo;