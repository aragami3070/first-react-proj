import { Button, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { CenterFullScreenLayout } from "../components/CenterFullScreenLayout";
import { GridBackGroundLayout } from "../components/GridBackGroundLayout";

export default function Home() {

  const theme = useTheme();
  return (
    <>
      <GridBackGroundLayout sx={{ minWidth: '100vw' }}>
        <Typography variant="h2" sx={{ padding: 2 }}>
          Добро пожаловать в &lt;Цитаты Дня&gt;!
        </Typography>
        <Typography variant="h4" sx={{ padding: 2, paddingBottom: 8 }}>
          Ваши любимые мемные цитаты из фильмов и сериалов.
        </Typography>
        <Button component={Link} to="/login" sx={{
          borderRadius: "12px",
          px: 2.5,
          boxShadow: 3,
          color: theme.palette.text.primary,
          background: theme.palette.primary.main
        }}>
          Войти, чтобы начать!
        </Button>
      </GridBackGroundLayout>

      <CenterFullScreenLayout sx={{ minWidth: '100vw' }}>
        <Typography variant="h2" sx={{ padding: 2 }}>
          Какие-то скрины
        </Typography>
      </CenterFullScreenLayout>

      <CenterFullScreenLayout sx={{ minWidth: '100vw' }}>
        <Typography variant="h2" sx={{ padding: 2 }}>
          Какие-то скрины
        </Typography>
      </CenterFullScreenLayout>
    </>
  );
}
