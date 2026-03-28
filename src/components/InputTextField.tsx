import { TextField, useTheme, type TextFieldProps } from "@mui/material";

export const InputTextField = ({ sx, ...props }: TextFieldProps) => {
  const theme = useTheme();
  const backgroundColor = theme.palette.background.default;
  const fontColor = theme.palette.text.primary;
  return (
    <TextField
      sx={[{
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
      },
      ...(Array.isArray(sx) ? sx : [sx])
      ]}
      fullWidth
      {...props}
    />
  );
}
