import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
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

  const categories = [...new Set(timers.map((timer) => timer.category))];
  const filteredTimers = filterCategory
    ? timers.filter((timer) => timer.category === filterCategory)
    : timers;

  const handleAddTimer = (timer) => {
    addTimer(timer);
    toast.success("Timer added successfully!");
  };

  const handleAlert = (message) => {
    toast(message, {
      icon: "⏰",
      style: {
        borderRadius: "8px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  return (
    <div className="min-h-screen px-4 py-6 sm:py-10 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-3xl mx-auto mb-8 sm:mb-10 text-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 py-2 sm:px-5 sm:py-3 rounded-full bg-white dark:bg-gray-800 shadow-sm">
          <FaClock className="text-indigo-600 dark:text-indigo-400 text-lg sm:text-xl" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
            MultiTimerApp
          </h1>
        </div>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-400 px-2 sm:px-0">
          Organize and track your time efficiently one task at a time.
        </p>
      </div>

      <div className="max-w-3xl mx-auto w-full mb-6 sm:mb-8">
        <AddTimer onAddTimer={handleAddTimer} />
      </div>

      {categories.length > 0 && (
        <div className="max-w-3xl mx-auto w-full mb-6 sm:mb-8">
          <CategoryFilter
            categories={categories}
            onFilterChange={setFilterCategory}
          />
        </div>
      )}

      <div className="max-w-3xl mx-auto w-full space-y-4 sm:space-y-6">
        <TimerList
          timers={filteredTimers}
          categories={filterCategory ? [filterCategory] : categories}
          onStart={(id) => startTimer(id, handleAlert)}
          onPause={pauseTimer}
          onReset={resetTimer}
          onComplete={(id) => completeTimer(id, handleAlert)}
          onDelete={(id) => {
            deleteTimer(id);
            // toast.success("Timer deleted.");
          }}
          onStartAll={startAllInCategory}
          onPauseAll={pauseAllInCategory}
          onResetAll={resetAllInCategory}
        />
      </div>
    </div>
  );
};

export default HomeScreen;
