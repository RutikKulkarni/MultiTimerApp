import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import HistoryScreen from "./screens/HistoryScreen";
import ThemeToggle from "./components/ThemeToggle";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
          <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
              <div className="flex space-x-6">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `text-sm sm:text-base font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/history"
                  className={({ isActive }) =>
                    `text-sm sm:text-base font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                    }`
                  }
                >
                  History
                </NavLink>
              </div>
              <ThemeToggle />
            </div>
          </nav>
          <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/history" element={<HistoryScreen />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
