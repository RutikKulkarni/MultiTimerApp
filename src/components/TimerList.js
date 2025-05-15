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
      <p className="text-gray-600 dark:text-gray-300">
        No timers yet. Add one to start!
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {categories.map((category) => (
        <CategoryGroup
          key={category}
          category={category}
          timers={timers.filter((timer) => timer.category === category)}
          onStart={onStart}
          onPause={onPause}
          onReset={onReset}
          onComplete={onComplete}
          onDelete={onDelete}
          onStartAll={() => onStartAll(category)}
          onPauseAll={() => onPauseAll(category)}
          onResetAll={() => onResetAll(category)}
        />
      ))}
    </div>
  );
};

export default TimerList;
