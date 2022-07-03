import { Button, PasswordInput, TextInput, Stack } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { SignUpFieldsDTO } from "../dto/sign-up-fields.dto";

interface SignUpFormProps {
  handleSubmit: (values: SignUpFieldsDTO) => void;
  initialValues?: SignUpFieldsDTO;
}

export function SignUpForm({
  handleSubmit,
  initialValues = { email: "", name: "", password: "" },
}: SignUpFormProps) {
  const form = useForm<SignUpFieldsDTO>({
    initialValues,
  });

  const handleSignUp = (values: SignUpFieldsDTO) => {
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
        <Button type="submit">Sign up</Button>
      </Stack>
    </form>
  );
}
