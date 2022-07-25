import { Button, PasswordInput, TextInput, Stack } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { Lock, Mail, User } from "tabler-icons-react";
import { z } from "zod";
import { SignUpDTO } from "../dto/sign-up.dto";

const signUpSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(5),
});

interface SignUpFormProps {
  handleSubmit: (values: SignUpDTO) => void;
  initialValues?: SignUpDTO;
  isSubmitting?: boolean;
}

export function SignUpForm({
  handleSubmit,
  initialValues = { email: "", name: "", password: "" },
  isSubmitting = false,
}: SignUpFormProps) {
  const form = useForm<SignUpDTO>({
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
          icon={<Mail size={16} />}
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />
        <TextInput
          required
          label="Username"
          autoComplete="username"
          icon={<User size={16} />}
          placeholder="bob123"
          {...form.getInputProps("name")}
        />
        <PasswordInput
          required
          label="Password"
          autoComplete="current-password"
          icon={<Lock size={16} />}
          placeholder="your-password"
          {...form.getInputProps("password")}
        />
        <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
          Sign up
        </Button>
      </Stack>
    </form>
  );
}
