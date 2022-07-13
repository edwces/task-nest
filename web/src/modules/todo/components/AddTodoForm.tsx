import { Button, Stack, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";

const addTodoSchema = z.object({
  label: z.string().min(1).max(20),
});

export type AddTodoDTO = z.infer<typeof addTodoSchema>;

interface AddTodoFormProps {
  handleSubmit: (values: AddTodoDTO) => void;
  initialValues?: AddTodoDTO;
  isSubmitting?: boolean;
}

export function AddTodoForm({
  handleSubmit,
  initialValues = { label: "" },
  isSubmitting = false,
}: AddTodoFormProps) {
  const form = useForm<AddTodoDTO>({
    initialValues,
    schema: zodResolver(addTodoSchema),
  });

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack spacing={30}>
        <TextInput required {...form.getInputProps("label")} />
        <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
          Confirm
        </Button>
      </Stack>
    </form>
  );
}
