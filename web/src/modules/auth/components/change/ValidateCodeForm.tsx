import { Button, Group, Stack, useMantineTheme } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { CSSProperties } from "react";
import ReactCodeInput from "react-code-input";
import { z } from "zod";

const validateCodeSchema = z.object({
  code: z.string().min(7).max(9),
});

export type ValidateCodeFieldsDTO = z.infer<typeof validateCodeSchema>;

interface ValidateCodeFormProps {
  onValidateCode: (values: ValidateCodeFieldsDTO) => void;
  initialValues?: ValidateCodeFieldsDTO;
  isSubmitting?: boolean;
  onResendCode?: () => void;
}

export function ValidateCodeForm({
  onValidateCode,
  initialValues = { code: "" },
  isSubmitting = false,
  onResendCode,
}: ValidateCodeFormProps) {
  const theme = useMantineTheme();
  const form = useForm({
    initialValues,
    schema: zodResolver(validateCodeSchema),
  });

  const handleCodeChange = (value: string) => {
    form.setFieldValue("code", value);
  };

  const inputStyle: CSSProperties = {
    backgroundColor: "transparent",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: "monospace",
    MozAppearance: "textfield",
    borderRadius: "6px",
    border: `1px solid ${theme.colorScheme === "dark" && theme.colors.gray[7]}`,
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,.10)",
    margin: "4px",
    paddingLeft: "8px",
    paddingRight: 0,
    width: "36px",
    height: "42px",
    fontSize: "32px",
    boxSizing: "border-box",
  };

  const inputStyleInvalid: CSSProperties = {
    ...inputStyle,
    color: theme.colors.red[5],
    border: `1px solid ${theme.colors.red[5]}`,
  };

  return (
    <form onSubmit={form.onSubmit(onValidateCode)}>
      <Stack spacing={35} align="center">
        <ReactCodeInput
          name="Code"
          inputMode="kana"
          fields={8}
          inputStyle={inputStyle}
          inputStyleInvalid={inputStyleInvalid}
          onChange={handleCodeChange}
          isValid={!form.errors["code"]}
        />
        <Group position="apart" sx={{ width: "100%" }}>
          <Button
            compact
            variant="subtle"
            disabled={isSubmitting}
            onClick={onResendCode}
          >
            Resend Password
          </Button>

          <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
            Validate Reset Code
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
