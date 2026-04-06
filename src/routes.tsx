import CreateQuote from "./pages/CreateQuote"
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
  { label: "Главная", path: "/", element: <Home /> },
  { label: "Профиль", path: "/profile", element: <Profile />, isPrivate: true },
  { label: "Создать цитату", path: "/create-quote", element: <CreateQuote />, isPrivate: true },
]

export const routes: RouteConfig[] = [
  { label: "Регистрация", path: "/register", element: <Register />, isGuest: true },
  { label: "Вход", path: "/login", element: <Login />, isGuest: true },
  ...navRouters
]
