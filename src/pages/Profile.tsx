import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Divider,
  Button
} from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import { type RootState } from "../store"
import { logoutLocal } from "../store/user"
import { useNavigate } from "react-router-dom"
import { GridBackGroundLayout } from "../ui/GridBackGroundLayout"

export default function Profile() {
  const user = useSelector((state: RootState) => state.user.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!user) {
    return (
      <GridBackGroundLayout >
        <Typography>Пользователь не найден</Typography>
      </GridBackGroundLayout>
    )
  }

  const handleLogout = () => {
    dispatch(logoutLocal())
    navigate("/login")
  }

  return (
    <GridBackGroundLayout >
      <Container maxWidth="sm">
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: 3
          }}
        >
          <CardContent>
            {/* Аватар */}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mb={2}
            >
              <Avatar sx={{ width: 80, height: 80, mb: 1 }}>
                {user.firstName?.[0]}
              </Avatar>

              <Typography variant="h5">
                {user.firstName} {user.secondName}
              </Typography>

              <Typography color="text.secondary">
                {user.email}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Данные */}
            <Box>
              <Typography variant="body1">
                <b>ID:</b> {user.id}
              </Typography>

              <Typography variant="body1">
                <b>Имя:</b> {user.firstName}
              </Typography>

              <Typography variant="body1">
                <b>Фамилия:</b> {user.secondName}
              </Typography>

              <Typography variant="body1">
                <b>Email:</b> {user.email}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Кнопки */}
            <Box display="flex" justifyContent="space-between">
              <Button
                variant="outlined"
                onClick={() => navigate("/")}
              >
                На главную
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={handleLogout}
              >
                Выйти
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </GridBackGroundLayout>
  )
}
