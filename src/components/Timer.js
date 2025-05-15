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
    <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md mb-4 transform transition-all hover:shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="mb-4 sm:mb-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Time: {formatTime(remaining)}
          </p>
          <p className="text-gray-600 dark:text-gray-300">Status: {status}</p>
          {hasHalfwayAlert && (
            <p className="text-gray-600 dark:text-gray-300">
              Halfway Alert: Enabled
            </p>
          )}
        </div>
        <div className="flex space-x-2">
          {status !== "Running" && status !== "Completed" && (
            <button
              onClick={() => onStart(id)}
              className="p-2 bg-secondary text-white rounded-lg hover:bg-green-700 transition-colors"
              title="Start"
            >
              <FaPlay />
            </button>
          )}
          {status === "Running" && (
            <button
              onClick={() => onPause(id)}
              className="p-2 bg-accent text-white rounded-lg hover:bg-yellow-600 transition-colors"
              title="Pause"
            >
              <FaPause />
            </button>
          )}
          <button
            onClick={() => onReset(id)}
            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            title="Reset"
          >
            <FaUndo />
          </button>
          {status === "Completed" && (
            <button
              onClick={() => onComplete(id)}
              className="p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              title="Mark Completed"
            >
              <FaCheck />
            </button>
          )}
          <button
            onClick={handleDelete}
            className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
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
