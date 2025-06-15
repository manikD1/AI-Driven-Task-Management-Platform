import React from "react";

const TaskSuggestions = ({ suggestions, onAdd, onClear }) => {
  if (!suggestions.length) return null;

  return (
    <div className="card w-full space-y-3">
      <div className="font-bold text-slate-200 mb-2">AI Suggestions:</div>
      <ul className="space-y-2">
        {suggestions.map((suggestion, idx) => (
          <li key={idx} className="flex justify-between items-center">
            <span className="text-slate-300">{suggestion}</span>
            <button
              className="btn-primary px-3 py-1 text-sm"
              onClick={() => onAdd(suggestion)}
            >
              Add
            </button>
          </li>
        ))}
      </ul>
      <button className="btn-secondary text-xs mt-2" onClick={onClear}>
        Clear Suggestions
      </button>
    </div>
  );
};

export default TaskSuggestions;