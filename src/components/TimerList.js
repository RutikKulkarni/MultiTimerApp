import CategoryGroup from "./CategoryGroup";

const TimerList = ({
  timers,
  categories,
  onStart,
  onPause,
  onReset,
  onComplete,
  onDelete,
  onStartAll,
  onPauseAll,
  onResetAll,
}) => {
  if (!categories.length) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
          No timers available yet. Start by creating your first one
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {categories.map((category) => {
        const categoryTimers = timers.filter(
          (timer) => timer.category === category
        );

        return (
          <div
            key={category}
            className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl px-4 py-5 sm:px-6 sm:py-6 border border-gray-100 dark:border-gray-700"
          >
            <CategoryGroup
              category={category}
              timers={categoryTimers}
              onStart={onStart}
              onPause={onPause}
              onReset={onReset}
              onComplete={onComplete}
              onDelete={onDelete}
              onStartAll={() => onStartAll(category)}
              onPauseAll={() => onPauseAll(category)}
              onResetAll={() => onResetAll(category)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default TimerList;
