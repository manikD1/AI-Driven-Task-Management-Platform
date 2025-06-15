import React from "react";

const RefinedTaskSuggestion = ({ suggestion, onApply, onClear }) => {
  if (!suggestion) return null;

  return (
    <div className="bg-slate-800 border border-slate-700 p-4 rounded-lg mt-2 flex items-center justify-between">
      <span className="text-slate-200">{suggestion}</span>
      <div className="flex gap-2">
        <button
          className="btn-primary flex items-center gap-2"
          onClick={onApply}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Apply
        </button>
        <button
          className="btn-secondary flex items-center gap-2"
          onClick={onClear}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Clear
        </button>
      </div>
    </div>
  );
};

export default RefinedTaskSuggestion;

