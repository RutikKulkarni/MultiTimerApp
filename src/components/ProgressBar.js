const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-600 mt-4 overflow-hidden">
      <div
        className="bg-primary h-3 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
