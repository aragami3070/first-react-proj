import { useForm, type RegisterOptions, type SubmitHandler } from "react-hook-form";
import { CustomForm } from "../ui/CustomForm";
import { InputTextField } from "../ui/InputTextField";


export default function CreateQuote() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuoteFormValue>();
  const onSubmit: SubmitHandler<QuoteFormValue> = async (data: QuoteFormValue) => {
  };
  return (
    <CustomForm onSubmit={handleSubmit(onSubmit)} buttonText="Aboba">
      <InputTextField
        label={"Введите цитату:"}
        type={"text"}
        key={"quote"}
        margin="normal"
        {...register("text", {
          required: "Введите цитату"
        })}
      />
    </CustomForm >
  );
}
        // error={!!errors[field.name] }
        // helperText={errors[field.name]?.message as string}
//
type QuoteFormValue = {
  text: string;
};

type QuoteFormField = {
  name: string,
  label: string,
  type: string,
  rules: RegisterOptions<QuoteFormValue>,
}

const field: QuoteFormField = {
  name: "quote",
  label: "Введите цитату",
  type: "text",
  rules: {
    required: "Введите ",
  },
  }
