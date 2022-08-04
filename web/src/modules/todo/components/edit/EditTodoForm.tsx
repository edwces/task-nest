import {
  Button,
  Group,
  Stack,
  Textarea,
  TextInput,
  Text,
  Checkbox,
  Divider,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { AlignLeft } from "tabler-icons-react";
import { z } from "zod";
import { UpdateTodoDTO } from "../../dto/update-todo.dto";

const editTodoSchema = z.object({
  label: z.string().min(1).max(20).optional(),
  description: z.string().max(1000).optional(),
});

interface EditTodoFormProps {
  initialValues: UpdateTodoDTO;
  onEdit?: (values: UpdateTodoDTO) => void;
  isSubmitting?: boolean;
}

export function EditTodoForm({
  initialValues,
  onEdit = () => {},
  isSubmitting = false,
}: EditTodoFormProps) {
  const form = useForm({ initialValues, schema: zodResolver(editTodoSchema) });

  return (
    <form onSubmit={form.onSubmit(onEdit)}>
      <Group align="flex-start">
        <Checkbox readOnly checked={false} radius="xl" size="xl" />
        <Stack>
          <TextInput
            variant="unstyled"
            autoComplete="off"
            styles={{ input: { fontFamily: "Montserrat", fontSize: 30 } }}
            {...form.getInputProps("label")}
          />
          <Divider />
          <Stack>
            <Text>Tags:</Text>
            <Text>Expires In:</Text>
          </Stack>
          <Divider />
          <Group>
            <AlignLeft size={25} />
            <Text>Description:</Text>
          </Group>
          <Textarea
            minRows={10}
            autosize
            {...form.getInputProps("description")}
          />
          <Group position="right" mt={10}>
            <Button
              variant="default"
              onClick={() => form.reset()}
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="filled"
              type="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              Save
            </Button>
          </Group>
        </Stack>
      </Group>
    </form>
  );
}
