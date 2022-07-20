import { Anchor, Button, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { NextLink } from "@mantine/next";
import { z } from "zod";

const createCodeSchema = z.object({
  email: z.string().email(),
});

export type CreateCodeFieldsDTO = z.infer<typeof createCodeSchema>;

interface CreateCodeFormProps {
  handleSubmit: (values: CreateCodeFieldsDTO) => void;
  initialValues?: CreateCodeFieldsDTO;
  isSubmitting?: boolean;
}

export function CreateCodeForm({
  handleSubmit,
  initialValues = { email: "" },
  isSubmitting = false,
}: CreateCodeFormProps) {
  const form = useForm({ initialValues });

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack spacing={25}>
        <TextInput required label="Email" {...form.getInputProps("email")} />
        <Group position="apart">
          <Anchor size="sm" component={NextLink} href="/account/sign-in">
            Return to Sign In Page
          </Anchor>
          <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
            send Reset Code
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
