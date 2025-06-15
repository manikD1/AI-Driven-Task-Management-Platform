import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
const router = express.Router();

import Todo from '../models/Todo.js';

// ✅ POST a new todo
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title } = req.body; // 🔹 Extract title from the request body
    const newTodo = new Todo({ title, userId: req.userId }); // 🔹 Create new Todo with that title and userId
    const savedTodo = await newTodo.save(); // 🔹 Save to MongoDB
    res.status(201).json(savedTodo); // ✅ Send back the saved todo
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' }); // ❌ Handle error
  }
});

// ✅ GET all todos
router.get('/', verifyToken, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId }); // 🔹 Fetch all todos from MongoDB
    res.status(200).json(todos);    // ✅ Return as JSON
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' }); // ❌ Handle error
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    console.log("🟠 DELETE request by user:", req.userId, "for todo ID:", req.params.id);

    const deletedTodo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.userId });

    if (!deletedTodo) {
      console.log("⚠️ Todo not found or doesn't belong to the user");
      return res.status(404).json({ error: 'Todo not found' });
    }

    console.log("✅ Todo deleted:", deletedTodo);
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error("❌ DELETE error:", error.message);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

router.delete('/', verifyToken, async (req, res) => {
  try {
    await Todo.deleteMany({ userId: req.userId });
    res.status(200).json({ message: 'All todos deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todos' });
  }
});

router.put('/:id', verifyToken, async (req, res) => {
  try {
    console.log("🟡 PUT request by user:", req.userId, "for todo ID:", req.params.id);

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { completed: req.body.completed },
      { new: true } // Return the updated document
    );

    if (!updatedTodo) {
      console.log("⚠️ Todo not found or doesn't belong to the user");
      return res.status(404).json({ error: 'Todo not found' });
    }

    console.log("✅ Todo updated:", updatedTodo);
    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("❌ PUT error:", error.message);
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

export default router;
