import mongoose from 'mongoose';

// ✅ Define the schema for a Todo item
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Task title is mandatory
  },
  completed: {
    type: Boolean,
    default: false, // New tasks are incomplete by default
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true, // ✅ Automatically adds createdAt and updatedAt fields
});

// ✅ Create and export the model
const Todo = mongoose.model('Todo', todoSchema);
export default Todo;
