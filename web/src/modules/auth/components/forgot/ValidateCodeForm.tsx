import { Button, Group, Stack, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import ReactCodeInput from "react-code-input";
import { z } from "zod";

const validateCodeSchema = z.object({
  code: z.string().min(7).max(9),
});

export type ValidateCodeFieldsDTO = z.infer<typeof validateCodeSchema>;

interface ValidateCodeFormProps {
  handleSubmit: (values: ValidateCodeFieldsDTO) => void;
  initialValues?: ValidateCodeFieldsDTO;
  isSubmitting?: boolean;
  onResendCode?: () => void;
}

export function ValidateCodeForm({
  handleSubmit,
  initialValues = { code: "" },
  isSubmitting = false,
  onResendCode,
}: ValidateCodeFormProps) {
  const theme = useMantineTheme();
  const form = useForm({ initialValues });

  const handleCodeChange = (value: string) => {
    form.setFieldValue("code", value);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack spacing={35} align="center">
        <ReactCodeInput
          name="Code"
          inputMode="kana"
          fields={8}
          inputStyle={{
            backgroundColor: "transparent",
            color: theme.colorScheme === "dark" ? theme.white : theme.black,
            fontFamily: "monospace",
            MozAppearance: "textfield",
            borderRadius: "6px",
            border: `1px solid ${
              theme.colorScheme === "dark" && theme.colors.gray[7]
            }`,
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,.10)",
            margin: "4px",
            paddingLeft: "8px",
            paddingRight: 0,
            width: "36px",
            height: "42px",
            fontSize: "32px",
            boxSizing: "border-box",
          }}
          onChange={handleCodeChange}
          isValid={!form.errors["code"]}
        />
        <Group position="apart" sx={{ width: "100%" }}>
          <Button compact variant="subtle" onClick={onResendCode}>
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
