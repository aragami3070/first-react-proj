import { useForm, type FieldValues, type Path, type RegisterOptions, type SubmitHandler } from "react-hook-form";
import { CustomForm } from "./AuthForm";
import { InputTextField } from "./InputTextField";
import { GridBackGroundLayout } from "./GridBackGroundLayout";
import { Typography } from "@mui/material";

type AuthTemplatePageProps<T extends FieldValues> = {
  title: string;
  fields: AuthFieldConfig<T>[];
  onSubmit: SubmitHandler<T>;
  buttonText: string;
}

export type AuthFieldConfig<T extends FieldValues> = {
  name: Path<T>,
  label: string,
  type: string,
  rules: RegisterOptions<T>,
}

export default function AuthTemplatePage<T extends FieldValues>({ title, fields, onSubmit, buttonText }: AuthTemplatePageProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>();

  return (
    <GridBackGroundLayout>
      <Typography variant="h3" sx={{ padding: 1 }}>
        {title}
      </Typography>
      <CustomForm onSubmit={handleSubmit(onSubmit)} buttonText={buttonText}>
        {fields.map((field) => (
          <InputTextField
            label={field.label}
            type={field.type}
            key={field.name}
            margin="normal"
            {...register(field.name, field.rules)}
            error={!!errors[field.name]}
            helperText={errors[field.name]?.message as string}
          />
        ))}
      </CustomForm>
    </GridBackGroundLayout>
  );
}
