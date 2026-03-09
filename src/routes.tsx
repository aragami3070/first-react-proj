import About from "./pages/About"
import Home from "./pages/Home"

export interface RouteConfig {
  label: string
  path: string
  element: React.ReactNode
}

export const routes: RouteConfig[] = [
  { label: "Home", path: "/", element: <Home /> },
  { label: "About", path: "/about", element: <About /> },
]
