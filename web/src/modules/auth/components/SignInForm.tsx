import { Button, PasswordInput, TextInput, Stack } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { SignInFieldsDTO } from "../dto/sign-in-fields.dto";

interface SignInFormProps {
  handleSubmit: (values: SignInFieldsDTO) => void;
  initialValues?: SignInFieldsDTO;
  isSubmitting?: boolean;
}

export function SignInForm({
  handleSubmit,
  initialValues = { email: "", password: "" },
  isSubmitting = false,
}: SignInFormProps) {
  const form = useForm<SignInFieldsDTO>({
    initialValues,
  });

  const handleSignUp = (values: SignInFieldsDTO) => {
    handleSubmit(values);
    form.reset();
  };

  return (
    <form onSubmit={form.onSubmit(handleSignUp)}>
      <Stack spacing={10}>
        <TextInput
          required
          label="Email"
          autoComplete="email"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          required
          label="Password"
          autoComplete="current-password"
          {...form.getInputProps("password")}
        />
        <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
          Sign in
        </Button>
      </Stack>
    </form>
  );
}
