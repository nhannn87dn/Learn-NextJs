import mongoose from 'mongoose'

export interface Todos extends mongoose.Document {
  title: string
  done: boolean
}

/* TodoSchema will correspond to a collection in your MongoDB database. */
const TodoSchema = new mongoose.Schema<Todos>({
  title: {
    type: String,
    required: [true, 'Please provide a name for this Todo.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  done: {
    type: Boolean,
  }
},
{
  timestamps: false
}

)

export default mongoose.models.Todo || mongoose.model<Todos>('Todo', TodoSchema)