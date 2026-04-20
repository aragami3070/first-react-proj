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
import { GuardWrapper } from "./components/wrappers/GuardWrapper";

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

  return (
    <ColorModeContext.Provider value={{ toggleTheme }}>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <NavBar />
        <ErrorModal />
        <CommonWrapper>
          <AuthWrapper>
            <Routes>
              <Route>
                {routes
                  .filter((router) =>
                    router.isPrivate === undefined
                    && router.isGuest === undefined)
                  .map((router) =>
                    <Route
                      key={router.path}
                      path={router.path}
                      element={router.element} />

                  )}
              </Route>

              <Route element={<GuestWrapper />}>
                {routes
                  .filter((router) => router.isGuest === true)
                  .map((router) =>
                    <Route
                      key={router.path}
                      path={router.path}
                      element={router.element} />
                  )}
              </Route>

              <Route element={<GuardWrapper />}>
                {routes
                  .filter((router) => router.isPrivate === true)
                  .map((router) =>
                    <Route
                      key={router.path}
                      path={router.path}
                      element={router.element} />

                  )}
              </Route>
            </Routes>
          </AuthWrapper>
        </CommonWrapper>
      </ThemeProvider>
    </ColorModeContext.Provider >
  );
}

export default App;
