import { Button, Stack, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";

const changePasswordSchema = z.object({
  password: z.string().min(5),
});

export type ChangePasswordFieldsDTO = z.infer<typeof changePasswordSchema>;

interface ChangePasswordFormProps {
  onChangePassword: (values: ChangePasswordFieldsDTO) => void;
  initialValues?: ChangePasswordFieldsDTO;
  isSubmitting?: boolean;
}

export function ChangePasswordForm({
  onChangePassword,
  initialValues = { password: "" },
  isSubmitting = false,
}: ChangePasswordFormProps) {
  const form = useForm({
    initialValues,
    schema: zodResolver(changePasswordSchema),
  });

  return (
    <form onSubmit={form.onSubmit(onChangePassword)}>
      <Stack spacing={25}>
        <TextInput
          required
          label="New password"
          {...form.getInputProps("password")}
        />
        <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
          Reset Password
        </Button>
      </Stack>
    </form>
  );
}
