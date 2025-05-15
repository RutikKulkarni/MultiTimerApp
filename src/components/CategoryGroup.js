import { useState } from "react";
import Timer from "./Timer";
import {
  FaChevronDown,
  FaChevronUp,
  FaPlay,
  FaPause,
  FaUndo,
} from "react-icons/fa";

const CategoryGroup = ({
  category,
  timers,
  onStart,
  onPause,
  onReset,
  onComplete,
  onDelete,
  onStartAll,
  onPauseAll,
  onResetAll,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm transition-all duration-300 p-4 sm:p-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
        >
          {isExpanded ? (
            <FaChevronUp className="mr-2 text-base" />
          ) : (
            <FaChevronDown className="mr-2 text-base" />
          )}
          {category}{" "}
          <span className="ml-1 text-sm text-gray-500">({timers.length})</span>
        </button>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onStartAll}
            className="group p-2 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:ring-2 ring-green-400 transition"
            title="Start All"
          >
            <FaPlay className="text-sm" />
          </button>
          <button
            onClick={onPauseAll}
            className="group p-2 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 hover:ring-2 ring-yellow-400 transition"
            title="Pause All"
          >
            <FaPause className="text-sm" />
          </button>
          <button
            onClick={onResetAll}
            className="group p-2 rounded-full bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:ring-2 ring-red-400 transition"
            title="Reset All"
          >
            <FaUndo className="text-sm" />
          </button>
        </div>
      </div>

      {/* Timers */}
      <div
        className={`grid gap-4 transition-all duration-300 ease-in-out ${
          isExpanded
            ? "max-h-[1000px] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        {timers.map((timer) => (
          <Timer
            key={timer.id}
            timer={timer}
            onStart={onStart}
            onPause={onPause}
            onReset={onReset}
            onComplete={onComplete}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryGroup;
