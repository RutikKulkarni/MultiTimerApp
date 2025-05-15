const CategoryFilter = ({ categories, onFilterChange }) => {
  return (
    <div className="mb-6">
      <label
        htmlFor="category"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        Filter by Category
      </label>
      <div className="relative w-full sm:w-64">
        <select
          id="category"
          onChange={(e) => onFilterChange(e.target.value)}
          className="appearance-none w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded-lg py-2.5 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
