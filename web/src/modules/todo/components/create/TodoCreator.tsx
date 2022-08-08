import { Badge, Checkbox, Group, Paper, Stack, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { TodoDateBadge } from "../../../dates/components/TodoDateBadge";
import { formatDate } from "../../../dates/util/date.util";
import { useTags } from "../../../tag/api/useTags";
import { useCreateTodoMutation } from "../../api/useCreateTodoMutation";
import { TodoCreatorActions } from "./TodoCreatorActions";

const addTodoSchema = z.object({
  label: z.string().min(1).max(300),
  tagIds: z.number().array().optional(),
  expiresAt: z.date().optional(),
  isBookmarked: z.boolean().optional(),
});

type CreateTodoFields = z.infer<typeof addTodoSchema>;

interface TodoCreatorProps {
  initialValues?: CreateTodoFields;
}

export function TodoCreator({
  initialValues = { label: "" },
}: TodoCreatorProps) {
  const form = useForm({ initialValues, schema: zodResolver(addTodoSchema) });
  const { data } = useTags();
  const createTodo = useCreateTodoMutation();

  const handleCreateTodo = (data: CreateTodoFields) => {
    const formattedDate = data.expiresAt
      ? formatDate(data.expiresAt!)
      : undefined;

    createTodo.mutate(
      { ...data, expiresAt: formattedDate },
      { onSuccess: () => form.reset() }
    );
  };
  return (
    <Paper withBorder p={10} radius="lg">
      <form onSubmit={form.onSubmit(handleCreateTodo)}>
        <Stack>
          <Group position="apart" pr={10}>
            <Checkbox readOnly checked={false} radius="xl" size="xl" />
            <TextInput
              variant="unstyled"
              placeholder="Add Todo"
              size="lg"
              autoComplete="off"
              sx={{ flexGrow: 2 }}
              {...form.getInputProps("label")}
            />
            <TodoCreatorActions control={form} tags={data} />
          </Group>
          <Group>
            {form.values.expiresAt && (
              <TodoDateBadge
                date={formatDate(form.values.expiresAt)}
                onClear={() => form.setFieldValue("expiresAt", undefined)}
              />
            )}
            {form.values.tagIds &&
              data &&
              form.values.tagIds.map((id) => (
                <Badge key={id}>
                  {data?.find((tag) => tag.id === id)?.label}
                </Badge>
              ))}
          </Group>
        </Stack>
      </form>
    </Paper>
  );
}
