import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { routes } from "./routes";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        {routes.map(router => <Route path={router.path} element={router.element} />)}
      </Routes>
    </>
  );
}

export default App;
