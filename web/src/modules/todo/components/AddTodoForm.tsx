import { Button, Select, SelectItem, Stack, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";

const addTodoSchema = z.object({
  label: z.string().min(1).max(20),
  tagId: z.number().positive().optional(),
});

export type AddTodoDTO = z.infer<typeof addTodoSchema>;

interface AddTodoFormProps {
  handleSubmit: (values: AddTodoDTO) => void;
  initialValues?: AddTodoDTO;
  isSubmitting?: boolean;
  tagsChoices?: (string | SelectItem)[];
  onTagCreate?: (query: string) => void;
}

export function AddTodoForm({
  handleSubmit,
  initialValues = { label: "" },
  isSubmitting = false,
  tagsChoices = [],
  onTagCreate,
}: AddTodoFormProps) {
  const form = useForm<AddTodoDTO>({
    initialValues,
    schema: zodResolver(addTodoSchema),
  });

  const onTagChange = (value: null | string) => {
    const finalValue = value ? Number.parseInt(value) : undefined;
    form.setFieldValue("tagId", finalValue);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack spacing={30}>
        <TextInput
          required
          placeholder="label"
          {...form.getInputProps("label")}
        />
        <Select
          data={tagsChoices}
          placeholder="Pick a tag"
          onChange={onTagChange}
          clearable
          creatable
          searchable
          getCreateLabel={(query) => `+ Create ${query}`}
          onCreate={onTagCreate}
        />
        <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
          Confirm
        </Button>
      </Stack>
    </form>
  );
}
