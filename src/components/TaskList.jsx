import React from 'react'

const TaskList = ({ filteredTodos, handleToggleTask, handleDeleteTask }) => {
  return (
    <div className="space-y-3">
      {filteredTodos.length === 0 ? (
        <div className="text-center py-8 text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p>No tasks yet. Add one above!</p>
        </div>
      ) : (
        filteredTodos.map((todo) => (
          <div
            key={todo._id}
            className="group flex items-center gap-4 p-4 bg-slate-800 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-all duration-200"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTask(todo._id)}
              className="w-5 h-5 rounded border-slate-600 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-800"
            />
            <p className={`flex-1 text-lg ${todo.completed ? "line-through text-slate-500" : "text-slate-200"}`}>
              {todo.title}
            </p>
            <button
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-slate-400 hover:text-red-400"
              onClick={() => handleDeleteTask(todo._id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))
      )}
    </div>
  )
}

export default TaskList