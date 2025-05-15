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
    <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-6 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2
          className="text-xl font-bold text-gray-900 dark:text-white cursor-pointer flex items-center"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <FaChevronUp className="mr-2" />
          ) : (
            <FaChevronDown className="mr-2" />
          )}
          {category} ({timers.length})
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={onStartAll}
            className="p-2 bg-secondary text-white rounded-lg hover:bg-green-700 transition-colors"
            title="Start All"
          >
            <FaPlay />
          </button>
          <button
            onClick={onPauseAll}
            className="p-2 bg-accent text-white rounded-lg hover:bg-yellow-600 transition-colors"
            title="Pause All"
          >
            <FaPause />
          </button>
          <button
            onClick={onResetAll}
            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            title="Reset All"
          >
            <FaUndo />
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="space-y-4">
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
      )}
    </div>
  );
};

export default CategoryGroup;
