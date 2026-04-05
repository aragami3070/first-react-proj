export function getErrorMessage(status: number) {
  switch (status) {
    case 400: return "Неверный запрос"
    case 404: return "Данные не найденны, увы. Повторите запрос позже"
    case 409: return "Почта уже занята"
    case 422: return "Неправильные данные"
  }
}
