import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const AddTimer = ({ onAddTimer }) => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [hasHalfwayAlert, setHasHalfwayAlert] = useState(false);

  const defaultCategories = ["Workout", "Study", "Break", "Cooking"];

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedCategory = category === "custom" ? customCategory : category;
    if (name && duration > 0 && selectedCategory) {
      onAddTimer({
        id: Date.now(),
        name,
        duration: parseInt(duration),
        category: selectedCategory,
        hasHalfwayAlert,
      });
      setName("");
      setDuration("");
      setCategory("");
      setCustomCategory("");
      setHasHalfwayAlert(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transform transition-all hover:shadow-xl"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
        <FaPlus className="mr-2 text-primary" /> Add New Timer
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Timer Name (e.g., Morning Run)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary"
        />
        <input
          type="number"
          placeholder="Duration (seconds)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary"
        >
          <option value="">Select Category</option>
          {defaultCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
          <option value="custom">Custom Category</option>
        </select>
        {category === "custom" && (
          <input
            type="text"
            placeholder="Custom Category"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            className="p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary"
          />
        )}
        <label className="flex items-center col-span-2">
          <input
            type="checkbox"
            checked={hasHalfwayAlert}
            onChange={(e) => setHasHalfwayAlert(e.target.checked)}
            className="mr-2 h-5 w-5 text-primary"
          />
          <span className="text-gray-900 dark:text-white">
            Enable Halfway Alert
          </span>
        </label>
        <button
          type="submit"
          className="p-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors col-span-2"
        >
          Add Timer
        </button>
      </div>
    </form>
  );
};

export default AddTimer;
