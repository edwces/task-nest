import { Group, Paper } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { useCreateTodoMutation } from "../../api/useCreateTodoMutation";
import { CreateTodoDTO } from "../../dto/create-todo.dto";
import { CheckboxTextInput } from "./CheckboxTextInput";
import { TodoCreatorActions } from "./TodoCreatorActions";

const addTodoSchema = z.object({
  label: z.string().min(1).max(20),
  tagIds: z.number().array().optional(),
});

interface TodoCreatorProps {
  initialValues?: CreateTodoDTO;
}

export function TodoCreator({
  initialValues = { label: "" },
}: TodoCreatorProps) {
  const form = useForm({ initialValues, schema: zodResolver(addTodoSchema) });
  const createTodo = useCreateTodoMutation();

  const handleCreateTodo = (data: CreateTodoDTO) =>
    createTodo.mutate(data, { onSuccess: () => form.reset() });

  return (
    <Paper withBorder p={10} radius="lg">
      <form onSubmit={form.onSubmit(handleCreateTodo)}>
        <Group position="apart">
          <CheckboxTextInput {...form.getInputProps("label")} />
          <TodoCreatorActions control={form} />
        </Group>
      </form>
    </Paper>
  );
}
