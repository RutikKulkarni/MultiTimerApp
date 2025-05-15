import { useState } from "react";
import AddTimer from "../components/AddTimer";
import TimerList from "../components/TimerList";
import CategoryFilter from "../components/CategoryFilter";
import useTimerStorage from "../hooks/useTimerStorage";
import { FaClock } from "react-icons/fa";

const HomeScreen = () => {
  const {
    timers,
    addTimer,
    startTimer,
    pauseTimer,
    resetTimer,
    completeTimer,
    deleteTimer,
    startAllInCategory,
    pauseAllInCategory,
    resetAllInCategory,
  } = useTimerStorage();

  const [filterCategory, setFilterCategory] = useState("");
  const [alert, setAlert] = useState({ isOpen: false, message: "" });

  const categories = [...new Set(timers.map((timer) => timer.category))];
  const filteredTimers = filterCategory
    ? timers.filter((timer) => timer.category === filterCategory)
    : timers;

  const handleAddTimer = (timer) => addTimer(timer);
  const handleAlert = (message) => setAlert({ isOpen: true, message });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center space-x-4">
        <FaClock className="text-2xl text-blue-600 dark:text-blue-400" />
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white">
          MultiTimerApp
        </h1>
      </div>

      <AddTimer onAddTimer={handleAddTimer} />

      {categories.length > 0 && (
        <CategoryFilter
          categories={categories}
          onFilterChange={setFilterCategory}
        />
      )}

      <TimerList
        timers={filteredTimers}
        categories={filterCategory ? [filterCategory] : categories}
        onStart={(id) => startTimer(id, handleAlert)}
        onPause={pauseTimer}
        onReset={resetTimer}
        onComplete={(id) => completeTimer(id, handleAlert)}
        onDelete={deleteTimer}
        onStartAll={startAllInCategory}
        onPauseAll={pauseAllInCategory}
        onResetAll={resetAllInCategory}
      />
    </div>
  );
};

export default HomeScreen;
