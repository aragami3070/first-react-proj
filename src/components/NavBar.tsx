import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { routes } from "../routes";

export default function NavBar() {
  return (
    <Box
      sx={{
        position: "fixed",
        left: "50%",
        transform: "translateX(-50%)",
        top: "20px",
        zIndex: 1000
      }}
    >
      <AppBar
        position="static"
        sx={{
          borderRadius: "12px",
          px: 0.5,
        }}
      >
        <Toolbar sx={{gap: 2}}>
          {routes.map((route) => (
            <Button
              key={route.path}
              color="inherit"
              component={Link}
              to={route.path}
            >
              {route.label}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
