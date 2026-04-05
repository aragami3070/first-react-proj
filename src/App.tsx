import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { routes } from "./routes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./theme";
import { createContext, useEffect, useState } from "react";

export const ColorModeContext = createContext({
  toggleTheme: () => { }
})

function App() {
  // Загружаем из localStorage при старте, по умолчанию true (dark)
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('darkMode');
      return saved ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev: boolean) => !prev)
  }

  // TODO: добавить после Routes Loader и ErrorModal
  return (
    <ColorModeContext.Provider value={{ toggleTheme }}>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <NavBar />
        <Routes>
          {routes.map(router => <Route key={router.path + router.label} path={router.path} element={router.element} />)}
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
