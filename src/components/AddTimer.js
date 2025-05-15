import { useState } from "react";
import { toast } from "react-toastify";

const AddTimer = ({ onAddTimer }) => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [hasHalfwayAlert, setHasHalfwayAlert] = useState(false);

  const defaultCategories = ["Workout", "Study", "Break", "Cooking"];

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedCustom = customCategory.trim();
    const selectedCategory = category === "custom" ? trimmedCustom : category;
    const parsedDuration = parseInt(duration, 10);

    if (!trimmedName) {
      toast.error("Timer name is required");
      return;
    }

    if (!duration || isNaN(parsedDuration) || parsedDuration <= 0) {
      toast.error("Please enter a valid duration in seconds");
      return;
    }

    if (!category) {
      toast.error("Please select a category");
      return;
    }

    if (category === "custom" && !trimmedCustom) {
      toast.error("Please enter a custom category name");
      return;
    }

    onAddTimer({
      id: Date.now(),
      name: trimmedName,
      duration: parsedDuration,
      category: selectedCategory,
      hasHalfwayAlert,
    });

    toast.success("Timer added successfully!");

    setName("");
    setDuration("");
    setCategory("");
    setCustomCategory("");
    setHasHalfwayAlert(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto mb-10 p-6 sm:p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-sm transition-all duration-300"
    >
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mb-6">
        Create a New Timer
      </h2>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Timer Name
          </label>
          <input
            type="text"
            placeholder="e.g. Morning Run"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Duration (in seconds)
          </label>
          <input
            type="number"
            placeholder="e.g. 300"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            {defaultCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
            <option value="custom">Custom Category</option>
          </select>
        </div>

        {category === "custom" && (
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Custom Category
            </label>
            <input
              type="text"
              placeholder="e.g. Meditation"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              className="rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <label className="flex items-center gap-3 col-span-full mt-2">
          <input
            type="checkbox"
            checked={hasHalfwayAlert}
            onChange={(e) => setHasHalfwayAlert(e.target.checked)}
            className="h-4 w-4 accent-blue-600 dark:accent-blue-400"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Enable Halfway Alert
          </span>
        </label>

        <button
          type="submit"
          className="w-full sm:w-auto col-span-full mt-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-2.5 px-5 rounded-lg transition"
        >
          Add Timer
        </button>
      </div>
    </form>
  );
};

export default AddTimer;
