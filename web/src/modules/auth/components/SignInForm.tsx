import {
  Button,
  PasswordInput,
  TextInput,
  Stack,
  Text,
  Anchor,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { NextLink } from "@mantine/next";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export type SignInFieldsDTO = z.infer<typeof signInSchema>;

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
    schema: zodResolver(signInSchema),
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
        <Anchor size="sm" component={NextLink} href="/account/forgot-password">
          Forgot password?
        </Anchor>
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
