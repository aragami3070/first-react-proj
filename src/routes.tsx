import About from "./pages/About"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Register from "./pages/Register"

export interface RouteConfig {
  label: string
  path: string
  element: React.ReactNode
  isPrivate?: boolean,
}

export const navRouters: RouteConfig[] = [
  { label: "Home", path: "/", element: <Home /> },
  { label: "About", path: "/about", element: <About /> },
  { label: "Profile", path: "/profile", element: <Profile />, isPrivate: true },
]

export const routes: RouteConfig[] = [
  { label: "register", path: "/register", element: <Register /> },
  { label: "login", path: "/login", element: <Login /> },
  ...navRouters
]
