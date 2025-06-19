import "../App.css";
import { useState, useEffect } from "react";
import AppTitle from "../components/AppTitle";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import TaskFilter from "../components/TaskFilter";
import TaskSuggestions from "../components/TaskSuggestions";
import RefinedTaskSuggestion from "../components/RefinedTaskSuggestion";
import api from "../utils/api";
import { Link } from "react-router-dom";

function Todo() {
  // State variables
  const [task, setTask] = useState(""); // For input field
  const [todos, setTodos] = useState([]); // Stores all todos from MongoDB
  const [filter, setFilter] = useState("all"); // 'all' | 'active' | 'completed'
  const [suggestions, setSuggestions] = useState([]);
  const [refinedSuggestion, setRefinedSuggestion] = useState("");

  useEffect(() => {
    // Check if user is logged in by checking for a token
    const token = localStorage.getItem("token");
    if (!token) return;

    // Fetch todos from the server
    api
      .get("/todos")
      .then((response) => {
        console.log("Todos fetched:", response.data); // Log the fetched todos
        setTodos(response.data); // Update the state with the fetched todos
      })
      .catch((error) => {
        console.error("Error fetching todos:", error); // Log any errors that occur
      });
  }, []);

  const handleAddTask = () => {
    if (task.trim() !== "") {
      api
        .post("/todos", { title: task })
        .then((response) => {
          setTodos([...todos, response.data]); // Add the created todo from backend
          setTask("");
        })
        .catch((error) => {
          console.error("Error adding todo:", error);
        });
    }
  };

  const handleRefineTask = () => {
    if (task.trim() !== "") {
      try {
        api.post("/ai/refine-task", { rawTask: task }).then((response) => {
          console.log("Refined task:", response.data);
          setRefinedSuggestion(response.data.refinedTask);
        });
      } catch (error) {
        alert(
          "AI refinement failed: " +
            (error.response?.data?.error || error.message)
        );
      }
    }
  };

  // Handle applying the refined task suggestion
  const handleApplyRefined = () => {
    setTask(refinedSuggestion); // Put suggestion in input for user to edit/add
    setRefinedSuggestion(""); // Clear after applying (optional)
  };

  // Handle clearing the refined task suggestion
  const handleClearRefined = () => {
    setRefinedSuggestion("");
  };

  // Handle getting AI suggestions
  const handleSuggestTasks = async () => {
    try {
      const response = await api.post("/ai/suggest-tasks", {
        todos: todos.map((t) => t.title),
      });
      let lines = response.data.suggestions
        .split("\n")
        .map((line) => line.replace(/^\d+\.\s*/, "").trim())
        .filter(Boolean);
      setSuggestions(lines);
    } catch (err) {
      alert(
        "AI suggestion failed: " + (err.response?.data?.error || err.message)
      );
    }
  };

  const handleAddSuggestedTask = (suggestion) => {
    setTask(suggestion); // puts suggestion into the input box so user can edit, or you can call handleAddTask directly
    // OR, if you want to auto-add:
    // api.post("/todos", { title: suggestion }).then(...)
  };

  // Toggle the 'completed' status of the todo by id
  const handleToggleTask = (id) => {
    api
      .put(`/todos/${id}`, {
        completed: !todos.find((todo) => todo._id === id).completed,
      })
      .then((response) => {
        const updatedTodos = todos.map((todo) =>
          todo._id === id ? response.data : todo
        );
        setTodos(updatedTodos);
      })
      .catch((error) => {
        console.error(
          "Error toggling todo:",
          error.response?.data || error.message
        );
        // Check if token is expired
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      });
  };

  // Delete a todo by id
  const handleDeleteTask = (id) => {
    api
      .delete(`/todos/${id}`)
      .then(() => {
        const updatedTodos = todos.filter((todo) => todo._id !== id);
        setTodos(updatedTodos);
      })
      .catch((error) => {
        console.error(
          "Error deleting todo:",
          error.response?.data || error.message
        );
        // Check if token is expired
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      });
  };

  // Compute todos to display based on current filter: 'all', 'active', 'completed'
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // if 'all'
  });

  // Remove all todos from state (and thus from UI)
  const handleClearAll = () => {
    api
      .delete("/todos")
      .then(() => {
        setTodos([]); // Clear the todos state
      })
      .catch((error) => {
        console.error("Error clearing todos:", error);
      });
  };

  return (
    <div className="min-h-screen bg-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header section */}
        <div className="text-center">
          <AppTitle title="AI-Driven Task Management Platform" />
        </div>

        {/* Main content card */}
        <div className="card space-y-6">
          {/* Input section */}
          <TaskInput
            task={task}
            setTask={setTask}
            handleAddTask={handleAddTask}
            handleRefineTask={handleRefineTask}
          />

          {/* AI Suggestions button */}
          <button
            className="w-full btn-primary flex items-center justify-center gap-2"
            onClick={handleSuggestTasks}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
            Get AI Suggestions
          </button>

          {/* Refined task suggestion */}
          <RefinedTaskSuggestion
            suggestion={refinedSuggestion}
            onApply={handleApplyRefined}
            onClear={handleClearRefined}
          />

          {/* Task suggestions */}
          <TaskSuggestions
            suggestions={suggestions}
            onAdd={handleAddSuggestedTask}
            onClear={() => setSuggestions([])}
          />

          {/* Task list */}
          <div className="space-y-4">
            <TaskList
              filteredTodos={filteredTodos}
              handleToggleTask={handleToggleTask}
              handleDeleteTask={handleDeleteTask}
            />
          </div>

          {/* Filters and actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-700">
            <TaskFilter setFilter={setFilter} handleClearAll={handleClearAll} />
            <Link
              to="/logout"
              className="btn-secondary flex items-center gap-2 px-6 py-2 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                />
              </svg>
              Logout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
