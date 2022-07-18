import { Button, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
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
        <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
          Create Reset Code
        </Button>
      </Stack>
    </form>
  );
}
