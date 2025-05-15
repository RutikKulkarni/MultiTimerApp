import { formatTime } from "../utils/formatTime";
import ProgressBar from "./ProgressBar";
import { FaPlay, FaPause, FaUndo, FaCheck, FaTrash } from "react-icons/fa";

const Timer = ({ timer, onStart, onPause, onReset, onComplete, onDelete }) => {
  const { id, name, duration, remaining, status, hasHalfwayAlert } = timer;
  const progress = duration ? ((duration - remaining) / duration) * 100 : 0;

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      if (typeof onDelete === "function") {
        onDelete(id);
      } else {
        console.error("onDelete is not a function");
      }
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-md mb-4">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Time: {formatTime(remaining)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Status: {status}
          </p>
          {hasHalfwayAlert && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Halfway Alert: Enabled
            </p>
          )}
        </div>
        <div className="flex gap-2">
          {status !== "Running" && status !== "Completed" && (
            <button
              onClick={() => onStart(id)}
              className="p-3 text-green"
              title="Start"
            >
              <FaPlay />
            </button>
          )}
          {status === "Running" && (
            <button
              onClick={() => onPause(id)}
              className="p-3 text-yellow"
              title="Pause"
            >
              <FaPause />
            </button>
          )}
          <button
            onClick={() => onReset(id)}
            className="p-3 text-green"
            title="Reset"
          >
            <FaUndo />
          </button>
          {status === "Completed" && (
            <button
              onClick={() => onComplete(id)}
              className="p-3 text-green"
              title="Complete"
            >
              <FaCheck />
            </button>
          )}
          <button
            onClick={handleDelete}
            className="p-3 text-red"
            title="Delete"
          >
            <FaTrash />
          </button>
        </div>
      </div>
      <ProgressBar progress={progress} />
    </div>
  );
};

export default Timer;
