import Home from "./pages/Home"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Register from "./pages/Register"

export interface RouteConfig {
  label: string
  path: string
  element: React.ReactNode
  isPrivate?: boolean,
  isGuest?: boolean,
}

export const navRouters: RouteConfig[] = [
  { label: "Home", path: "/", element: <Home /> },
  { label: "Profile", path: "/profile", element: <Profile />, isPrivate: true },
]

export const routes: RouteConfig[] = [
  { label: "register", path: "/register", element: <Register />, isGuest: true },
  { label: "login", path: "/login", element: <Login />, isGuest: true },
  ...navRouters
]
