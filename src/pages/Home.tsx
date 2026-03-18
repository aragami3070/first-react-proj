import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";


export default function Home() {

  const theme = useTheme();
  return (
    <>
      <Box
        sx={(theme) => {
          const gridColor = alpha(theme.palette.divider, 0.19);
          return {
            minHeight: '100vh',
            minWidth: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // сетка поверх
            backgroundImage: `
            linear-gradient(${gridColor} 1px, transparent 1px),
            linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
          `,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 0 0',
          }
        }}
      >
        <Container
          maxWidth='xl'
          sx={{
            display: 'flex',
            flexDirection: "column",
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h2" sx={{ padding: 2 }}>
            Добро пожаловать в &lt;Цитаты Дня&gt;!
          </Typography>
          <Typography variant="h4" sx={{ padding: 2, paddingBottom: 8 }}>
            Ваши любимые мемные цитаты из фильмов и сериалов.
          </Typography>
          <Button sx={{
            borderRadius: "12px",
            px: 2.5,
            boxShadow: 3,
            color: theme.palette.text.primary,
            background: theme.palette.primary.main
          }}>
            Войти, чтобы начать!
          </Button>
        </Container>
      </Box>

      <Box
        sx={{
          minHeight: '100vh',
          minWidth: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container
          maxWidth='xl'
          sx={{
            display: 'flex',
            flexDirection: "column",
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h2" sx={{ padding: 2 }}>
            Какие-то скрины
          </Typography>
        </Container>
      </Box>

      <Box
        sx={{
          minHeight: '100vh',
          minWidth: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container
          maxWidth='xl'
          sx={{
            display: 'flex',
            flexDirection: "column",
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h2" sx={{ padding: 2 }}>
            Какие-то скрины
          </Typography>
        </Container>
      </Box>
    </>
  );
}
