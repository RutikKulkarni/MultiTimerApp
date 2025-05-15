import { useState } from "react";
import { getHistory } from "../utils/storage";
import { FaDownload, FaHistory } from "react-icons/fa";

const HistoryScreen = () => {
  const [history] = useState(getHistory());
  const [exportError, setExportError] = useState("");

  const handleExport = () => {
    try {
      const historyData = getHistory();
      if (historyData.length === 0) {
        setExportError("No history to export.");
        return;
      }
      const dataStr = JSON.stringify(historyData, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "timer_history.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setExportError("");
    } catch (error) {
      setExportError("Failed to export history. Please try again.");
      console.error("Export error:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white flex items-center">
        <FaHistory className="mr-3 text-primary" /> Timer History
      </h1>
      <button
        onClick={handleExport}
        className="mb-6 p-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
      >
        <FaDownload className="mr-2" /> Export History
      </button>
      {exportError && <p className="text-red-500 mb-4">{exportError}</p>}
      {history.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">
          No completed timers yet. Complete a timer to see it here.
        </p>
      ) : (
        <ul className="space-y-4">
          {history.map((record, index) => (
            <li
              key={index}
              className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <p className="text-gray-900 dark:text-white">
                <strong>{record.name}</strong> (Category: {record.category})
                completed on {new Date(record.completionTime).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoryScreen;
