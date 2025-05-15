const ProgressBar = ({ progress }) => {
  return (
    <div
      className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2 mt-2 overflow-hidden shadow-inner"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Timer progress"
    >
      <div
        className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition-all duration-500 ease-in-out shadow-sm"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
