import { useState, useEffect } from "react";
import {
  getTimers,
  saveTimers,
  getHistory,
  saveHistory,
} from "../utils/storage";
import { toast } from "react-hot-toast";

const useTimerStorage = () => {
  const [timers, setTimers] = useState(() => {
    const loaded = getTimers();
    return loaded.map((timer) => ({
      ...timer,
      completionNotified: timer.completionNotified || false,
    }));
  });
  const [history, setHistory] = useState(getHistory());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) => {
        const updatedTimers = prevTimers.map((timer) => {
          if (timer.status === "Running" && timer.remaining > 0) {
            const newRemaining = timer.remaining - 1;

            if (newRemaining <= 0 && !timer.completionNotified) {
              toast.success(`Timer "${timer.name}" completed!`);
              return {
                ...timer,
                remaining: 0,
                status: "Completed",
                completionNotified: true,
              };
            }

            if (
              timer.hasHalfwayAlert &&
              newRemaining === Math.floor(timer.duration / 2)
            ) {
              toast(`⏳ Halfway through "${timer.name}"!`, {
                style: {
                  background: "#333",
                  color: "#fff",
                },
              });
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
      completionNotified: false,
    };
    setTimers((prev) => {
      const updated = [...prev, newTimer];
      saveTimers(updated);
      return updated;
    });
    toast.success(`Added timer "${timer.name}"`);
  };

  const startTimer = (id) => {
    setTimers((prev) => {
      const updated = prev.map((timer) => {
        if (timer.id === id && timer.status !== "Completed") {
          if (timer.remaining <= 0) {
            toast.error(`Timer "${timer.name}" already completed!`);
            return {
              ...timer,
              status: "Completed",
              remaining: 0,
              completionNotified: true,
            };
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
          ? {
              ...timer,
              remaining: timer.duration,
              status: "Paused",
              completionNotified: false,
            }
          : timer
      );
      saveTimers(updated);
      toast.success(`Timer reset`);
      return updated;
    });
  };

  const completeTimer = (id) => {
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
        toast.success(`Completed "${timer.name}" & added to history`);
      }
      const updated = prev.filter((t) => t.id !== id);
      saveTimers(updated);
      return updated;
    });
  };

  const deleteTimer = (id) => {
    setTimers((prev) => {
      const timer = prev.find((t) => t.id === id);
      const updated = prev.filter((t) => t.id !== id);
      saveTimers(updated);
      if (timer) {
        toast.success(`"${timer.name}" Timer deleted.`);
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
      toast.success(`Started all timers in "${category}"`);
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
      toast.success(`Paused all timers in "${category}"`);
      return updated;
    });
  };

  const resetAllInCategory = (category) => {
    setTimers((prev) => {
      const updated = prev.map((timer) =>
        timer.category === category
          ? {
              ...timer,
              remaining: timer.duration,
              status: "Paused",
              completionNotified: false,
            }
          : timer
      );
      saveTimers(updated);
      toast.success(`Reset all timers in "${category}"`);
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
