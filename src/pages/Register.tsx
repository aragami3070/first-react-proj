import type { SubmitHandler } from "react-hook-form";
import type { AuthFieldConfig } from "../components/AuthTemplatePage";
import AuthTemplatePage from "../components/AuthTemplatePage";

export default function Register() {
  const onSubmit: SubmitHandler<RegisterFormValues> = (data: RegisterFormValues) => {
    console.log(data);
  };

  return (
    <>
      <AuthTemplatePage
        title="Регистрация"
        fields={fields}
        onSubmit={onSubmit}
        submitButtonText="Создать аккаунт"
        switchTo="/login"
        switchLinkText="Войти"
        switchText="Есть аккаунт?"
      />
    </>
  );
}

type RegisterFormValues = {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
};

const fields: AuthFieldConfig<RegisterFormValues>[] = [
  {
    name: "firstName",
    label: "Имя",
    type: "text",
    rules: {
      required: "Введите Имя",
    }
  },
  {
    name: "secondName",
    label: "Фамилию",
    type: "text",
    rules: {
      required: "Введите Фамилию",
    }
  },
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
