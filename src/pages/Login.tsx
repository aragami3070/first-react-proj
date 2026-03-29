import type { SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { login } from "../store/user";
import { useAppDispatch, type RootState } from "../store";
import type { AuthFieldConfig } from "../components/AuthTemplatePage";
import AuthTemplatePage from "../components/AuthTemplatePage";

// TODO: после успешного Login делать getMe, которая стучится на профиль и выдает User
export default function Login() {
  const dispatch = useAppDispatch();
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  const isUserLoading = useSelector((state: RootState) => state.user.isUserLoading);

  useEffect(() => {
    if (isAuth && !isUserLoading) {
      console.log("User logged in, but not loading");
      console.log("Loading user");
    }
  }, [isAuth])

  const onSubmit: SubmitHandler<LoginFormValues> = async (data: LoginFormValues) => {
    await dispatch(login({
      email: data.email,
      password: data.password
    }))
  };

  return (
    <AuthTemplatePage
      title="Вход"
      fields={fields}
      onSubmit={onSubmit}
      buttonText="Войти в аккаунт"
    />
  );
}

type LoginFormValues = {
  email: string;
  password: string;
};


const fields: AuthFieldConfig<LoginFormValues>[] = [
  {
    name: "email",
    label: "Почта",
    type: "email",
    rules: {
      required: "Введите почту",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Некорректный почта",
      },
    },
  },
  {
    name: "password",
    label: "Пароль",
    type: "password",
    rules: {
      required: "Введите пароль",
      minLength: {
        value: 16,
        message: "Минимум 16 символов",
      },
    }
  }
]
