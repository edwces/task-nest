import { Button, Group, Stack, Textarea, TextInput, Text } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { AlignLeft, Edit } from "tabler-icons-react";
import { z } from "zod";

const editTodoSchema = z.object({
  label: z.string().min(1).max(20).optional(),
  description: z.string().max(1000).optional(),
});

type EditTodoDTO = z.infer<typeof editTodoSchema>;

interface EditTodoFormProps {
  initialValues: EditTodoDTO;
  onSubmit?: (values: EditTodoDTO) => void;
  isSubmitting?: boolean;
}

export function EditTodoForm({
  initialValues,
  onSubmit = () => {},
}: EditTodoFormProps) {
  const form = useForm({ initialValues, schema: zodResolver(editTodoSchema) });

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack justify="flex-start">
        <TextInput
          icon={<Edit size={25} />}
          size="xl"
          variant="unstyled"
          {...form.getInputProps("label")}
        />
        <Group ml={20}>
          <AlignLeft size={25} />
          <Text>Description:</Text>
        </Group>
        <Textarea
          ml={20}
          minRows={10}
          autosize
          {...form.getInputProps("description")}
        />
        <Group mt={25} position="right">
          <Button variant="default" onClick={() => form.reset()}>
            Cancel
          </Button>
          <Button variant="filled" type="submit">
            Save
          </Button>
        </Group>
      </Stack>
    </form>
  );
}