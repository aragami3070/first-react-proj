import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { routes } from "./routes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./theme";
import { createContext, useEffect, useState } from "react";
import { ErrorModal } from "./components/ErrorModal";
import { AuthWrapper } from "./components/wrappers/AuthWrapper";
import { GuestWrapper } from "./components/wrappers/GuestWrapper";
import { CommonWrapper } from "./components/wrappers/CommonWrapper";

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
        <ErrorModal />
        <Routes>
          {routes
            .map((router) => {
              let element = router.element

              if (router.isPrivate) {
                element = <AuthWrapper>{element}</AuthWrapper>
              } else if (router.isGuest) {
                element = <GuestWrapper>{element}</GuestWrapper>
              }
              element = <CommonWrapper>{element}</CommonWrapper>
              return (
                <Route
                  key={router.path}
                  path={router.path}
                  element={element} />
              )
            }
            )}
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
