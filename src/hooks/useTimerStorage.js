import { useState, useEffect } from "react";
import {
  getTimers,
  saveTimers,
  getHistory,
  saveHistory,
} from "../utils/storage";

const useTimerStorage = () => {
  const [timers, setTimers] = useState(getTimers());
  const [history, setHistory] = useState(getHistory());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) => {
        const updatedTimers = prevTimers.map((timer) => {
          if (timer.status === "Running" && timer.remaining > 0) {
            const newRemaining = timer.remaining - 1;
            if (newRemaining <= 0) {
              return { ...timer, remaining: 0, status: "Completed" };
            }
            return { ...timer, remaining: newRemaining };
          }
          return timer;
        });
        saveTimers(updatedTimers);
        return updatedTimers;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addTimer = (timer) => {
    const newTimer = {
      ...timer,
      remaining: timer.duration,
      status: "Paused",
    };
    setTimers((prev) => {
      const updated = [...prev, newTimer];
      saveTimers(updated);
      return updated;
    });
  };

  const startTimer = (id, onAlert) => {
    setTimers((prev) => {
      const updated = prev.map((timer) => {
        if (timer.id === id && timer.status !== "Completed") {
          if (timer.remaining <= 0) {
            onAlert(`Timer "${timer.name}" has completed!`);
            return { ...timer, status: "Completed", remaining: 0 };
          }
          if (
            timer.hasHalfwayAlert &&
            timer.remaining === Math.floor(timer.duration / 2)
          ) {
            onAlert(`Halfway alert for "${timer.name}"!`);
          }
          return { ...timer, status: "Running" };
        }
        return timer;
      });
      saveTimers(updated);
      return updated;
    });
  };

  const pauseTimer = (id) => {
    setTimers((prev) => {
      const updated = prev.map((timer) =>
        timer.id === id && timer.status === "Running"
          ? { ...timer, status: "Paused" }
          : timer
      );
      saveTimers(updated);
      return updated;
    });
  };

  const resetTimer = (id) => {
    setTimers((prev) => {
      const updated = prev.map((timer) =>
        timer.id === id
          ? { ...timer, remaining: timer.duration, status: "Paused" }
          : timer
      );
      saveTimers(updated);
      return updated;
    });
  };

  const completeTimer = (id, onAlert) => {
    setTimers((prev) => {
      const timer = prev.find((t) => t.id === id);
      if (timer) {
        setHistory((prevHistory) => {
          const updatedHistory = [
            ...prevHistory,
            {
              name: timer.name,
              category: timer.category,
              completionTime: new Date().toISOString(),
            },
          ];
          saveHistory(updatedHistory);
          return updatedHistory;
        });
        onAlert(
          `Timer "${timer.name}" marked as completed and added to history.`
        );
      }
      const updated = prev.filter((t) => t.id !== id);
      saveTimers(updated);
      return updated;
    });
  };

  const deleteTimer = (id, onAlert) => {
    setTimers((prev) => {
      const timer = prev.find((t) => t.id === id);
      const updated = prev.filter((t) => t.id !== id);
      saveTimers(updated);
      if (timer && onAlert) {
        onAlert(`Timer "${timer.name}" deleted.`);
      }
      return updated;
    });
  };

  const startAllInCategory = (category) => {
    setTimers((prev) => {
      const updated = prev.map((timer) =>
        timer.category === category &&
        timer.status !== "Completed" &&
        timer.remaining > 0
          ? { ...timer, status: "Running" }
          : timer
      );
      saveTimers(updated);
      return updated;
    });
  };

  const pauseAllInCategory = (category) => {
    setTimers((prev) => {
      const updated = prev.map((timer) =>
        timer.category === category && timer.status === "Running"
          ? { ...timer, status: "Paused" }
          : timer
      );
      saveTimers(updated);
      return updated;
    });
  };

  const resetAllInCategory = (category) => {
    setTimers((prev) => {
      const updated = prev.map((timer) =>
        timer.category === category
          ? { ...timer, remaining: timer.duration, status: "Paused" }
          : timer
      );
      saveTimers(updated);
      return updated;
    });
  };

  return {
    timers,
    history,
    addTimer,
    startTimer,
    pauseTimer,
    resetTimer,
    completeTimer,
    deleteTimer,
    startAllInCategory,
    pauseAllInCategory,
    resetAllInCategory,
  };
};

export default useTimerStorage;
