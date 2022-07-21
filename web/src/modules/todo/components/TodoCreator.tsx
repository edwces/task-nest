import { ActionIcon, Checkbox, Group, Paper, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { Plus } from "tabler-icons-react";
import { z } from "zod";
import { useTagCreateMutation } from "../../navigation/hooks/useTagCreateMutation";
import { useTags } from "../../navigation/hooks/useTags";
import { Tag } from "../../navigation/models/tag.model";
import { TagActionButton } from "./TagActionButton";

const addTodoSchema = z.object({
  label: z.string().min(1).max(20),
  tagId: z.number().positive().optional(),
});

export type AddTodoDTO = z.infer<typeof addTodoSchema>;

interface TodoCreatorProps {
  initialValues?: AddTodoDTO;
  onCreate?: (dto: AddTodoDTO) => void;
}

export function TodoCreator({
  initialValues = { label: "" },
  onCreate = () => {},
}: TodoCreatorProps) {
  const form = useForm({ initialValues, schema: zodResolver(addTodoSchema) });
  const createTag = useTagCreateMutation();
  const { data } = useTags();

  const tagsToChoices = (data: Tag[]) => {
    return data.map((tag) => ({ value: tag.id.toString(), label: tag.label }));
  };

  const handleTagChange = (value: null | string) => {
    const finalValue = value ? Number.parseInt(value) : undefined;
    form.setFieldValue("tagId", finalValue);
  };

  const handleCreate = (dto: AddTodoDTO) => {
    onCreate(dto);
    form.reset();
  };

  return (
    <Paper withBorder p={10} radius="lg">
      <form onSubmit={form.onSubmit(handleCreate)}>
        <Group position="apart">
          <Group>
            <Checkbox checked={false} radius="xl" size="xl" />
            <TextInput
              variant="unstyled"
              placeholder="Add Todo"
              size="lg"
              {...form.getInputProps("label")}
            />
          </Group>
          <Group>
            <TagActionButton
              tagsChoices={data ? tagsToChoices(data) : []}
              onTagCreate={(label) => createTag.mutate({ label })}
              onTagChange={handleTagChange}
            />
            <ActionIcon type="submit" mr={10}>
              <Plus size={30} />
            </ActionIcon>
          </Group>
        </Group>
      </form>
    </Paper>
  );
}
