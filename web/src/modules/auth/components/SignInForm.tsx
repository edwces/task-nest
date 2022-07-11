import {
  Button,
  PasswordInput,
  TextInput,
  Stack,
  Text,
  Anchor,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { NextLink } from "@mantine/next";
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

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack spacing={25}>
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
        <Text size="sm">
          Don&apos;t have an Account? Create it{" "}
          <Anchor size="sm" component={NextLink} href="/account/sign-up">
            here
          </Anchor>
        </Text>
      </Stack>
    </form>
  );
}
