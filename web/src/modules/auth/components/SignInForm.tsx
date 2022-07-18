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
import { Lock, Mail } from "tabler-icons-react";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(5, { message: "Password must contain at least 5 characters" }),
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
          placeholder="your@email.com"
          icon={<Mail size={16} />}
          {...form.getInputProps("email")}
        />
        <PasswordInput
          required
          label="Password"
          placeholder="your-password"
          autoComplete="current-password"
          icon={<Lock size={16} />}
          {...form.getInputProps("password")}
        />
        <Anchor size="sm" component={NextLink} href="/account/forgot-password">
          Forgot password?
        </Anchor>
        <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
          Sign in
        </Button>
      </Stack>
    </form>
  );
}
