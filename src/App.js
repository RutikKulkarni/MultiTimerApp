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
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import "./index.css";

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
          <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
              <div className="flex items-center justify-between w-full sm:w-auto">
                <div className="flex space-x-6 hidden sm:flex">
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

                <div className="sm:hidden">
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-gray-700 dark:text-gray-300 focus:outline-none"
                  >
                    {isMobileMenuOpen ? (
                      <FiX size={24} />
                    ) : (
                      <FiMenu size={24} />
                    )}
                  </button>
                </div>
              </div>

              <div className="hidden sm:block">
                <ThemeToggle />
              </div>
            </div>

            {isMobileMenuOpen && (
              <div className="sm:hidden px-4 pb-4 space-y-2">
                <NavLink
                  to="/"
                  end
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block text-sm font-medium transition-colors duration-200 ${
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
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                    }`
                  }
                >
                  History
                </NavLink>
                <div className="pt-2">
                  <ThemeToggle />
                </div>
              </div>
            )}
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
