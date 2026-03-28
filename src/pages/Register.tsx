import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

type RegisterFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const onSubmit: SubmitHandler<RegisterFormValues> = (data: RegisterFormValues) => {
    console.log(data);
  };

  const theme = useTheme();
  const backgroundColor = theme.palette.background.default;
  const fontColor = theme.palette.text.primary;
  return (
    <Box
      sx={(theme) => {
        const gridColor = alpha(theme.palette.divider, 0.19);
        return {
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `
            linear-gradient(${gridColor} 1px, transparent 1px),
            linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        };
      }}
    >
      <Container maxWidth="xs"
        sx={{
          display: 'flex',
          flexDirection: "column",
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h4" sx={{ padding: 1 }}>
          Регистрация
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}
          style={{
            display: 'flex',
            flexDirection: "column",
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >

          <TextField
            sx={{
              background: backgroundColor,
              "& .MuiInputBase-input": {
                color: fontColor,
              },
              "& .MuiInputLabel-root": {
                color: fontColor,
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: fontColor,
              },
            }}
            fullWidth
            label="Имя"
            margin="normal"
            {...register("firstName", {
              required: "Введите имя",
            })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />

          <TextField
            sx={{
              background: backgroundColor,
              "& .MuiInputBase-input": {
                color: fontColor,
              },
              "& .MuiInputLabel-root": {
                color: fontColor,
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: fontColor,
              },
            }}
            fullWidth
            label="Фамилия"
            margin="normal"
            {...register("lastName", {
              required: "Введите фамилию",
            })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />

          <TextField
            sx={{
              background: backgroundColor,
              "& .MuiInputBase-input": {
                color: fontColor,
              },
              "& .MuiInputLabel-root": {
                color: fontColor,
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: fontColor,
              },
            }}
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            {...register("email", {
              required: "Введите email",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Некорректный email",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            sx={{
              background: backgroundColor,
              "& .MuiInputBase-input": {
                color: fontColor,
              },
              "& .MuiInputLabel-root": {
                color: fontColor,
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: fontColor,
              },
            }}
            fullWidth
            label="Пароль"
            type="password"
            margin="normal"
            {...register("password", {
              required: "Введите пароль",
              minLength: {
                value: 16,
                message: "Минимум 16 символов",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
            }}
          >
            Создать аккаунт
          </Button>
        </form>
      </Container>
    </Box>
  );
}
