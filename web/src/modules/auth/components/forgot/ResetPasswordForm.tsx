import { Button, Stack, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";

const resetPasswordSchema = z.object({
  password: z.string().min(5),
});

export type ResetPasswordFieldsDTO = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordFormProps {
  handleSubmit: (values: ResetPasswordFieldsDTO) => void;
  initialValues?: ResetPasswordFieldsDTO;
  isSubmitting?: boolean;
}

export function ResetPasswordForm({
  handleSubmit,
  initialValues = { password: "" },
  isSubmitting = false,
}: ResetPasswordFormProps) {
  const form = useForm({
    initialValues,
    schema: zodResolver(resetPasswordSchema),
  });

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
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
