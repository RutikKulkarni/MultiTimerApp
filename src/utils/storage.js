export const getTimers = () => {
  const timers = localStorage.getItem("timers");
  return timers ? JSON.parse(timers) : [];
};

export const saveTimers = (timers) => {
  localStorage.setItem("timers", JSON.stringify(timers));
};

export const getHistory = () => {
  const history = localStorage.getItem("history");
  return history ? JSON.parse(history) : [];
};

export const saveHistory = (history) => {
  localStorage.setItem("history", JSON.stringify(history));
};
