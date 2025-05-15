const CategoryFilter = ({ categories, onFilterChange }) => {
  return (
    <select
      onChange={(e) => onFilterChange(e.target.value)}
      className="p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary mb-6 w-full sm:w-64"
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;
