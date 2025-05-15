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
    <div className="container mx-auto p-6 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <FaHistory className="text-primary" /> Timer History
        </h1>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <FaDownload /> Export History
        </button>
      </div>

      {exportError && <p className="text-red-500 mt-3">{exportError}</p>}
      {history.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300 mt-4">
          No completed timers yet.
        </p>
      ) : (
        <ul className="mt-4 space-y-2">
          {history.map((record, index) => (
            <li
              key={index}
              className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-gray-800 dark:text-white">
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
