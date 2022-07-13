import { Button, PasswordInput, TextInput, Stack } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";

const signUpSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(5),
});

export type SignUpFieldsDTO = z.infer<typeof signUpSchema>;

interface SignUpFormProps {
  handleSubmit: (values: SignUpFieldsDTO) => void;
  initialValues?: SignUpFieldsDTO;
  isSubmitting?: boolean;
}

export function SignUpForm({
  handleSubmit,
  initialValues = { email: "", name: "", password: "" },
  isSubmitting = false,
}: SignUpFormProps) {
  const form = useForm<SignUpFieldsDTO>({
    initialValues,
    schema: zodResolver(signUpSchema),
  });

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack spacing={25}>
        <TextInput
          required
          label="Email"
          autoComplete="email"
          {...form.getInputProps("email")}
        />
        <TextInput
          required
          label="Username"
          autoComplete="username"
          {...form.getInputProps("name")}
        />
        <PasswordInput
          required
          label="Password"
          autoComplete="current-password"
          {...form.getInputProps("password")}
        />
        <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
          Sign up
        </Button>
      </Stack>
    </form>
  );
}
