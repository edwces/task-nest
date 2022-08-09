import {
  ActionIcon,
  Checkbox,
  Group,
  Paper,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { Calendar, Plus, Tag } from "tabler-icons-react";
import { z } from "zod";
import { DateSelectPopover } from "../../../dates/components/DateSelectPopover";
import { TagSelectPopover } from "../../../tag/components/TagSelectPopover";
import { useCreateTodoMutation } from "../../api/useCreateTodoMutation";
import {
  filterNans,
  toNumberArray,
  toStringArray,
} from "../../util/array.util";

const createTodoSchema = z.object({
  label: z.string().min(1).max(300),
  tagIds: z.number().array(),
  expiresAt: z.date().nullable().optional(),
  isBookmarked: z.boolean().optional(),
});

type TodoCreatorInput = z.input<typeof createTodoSchema>;

interface TodoCreatorProps {
  initialValues?: TodoCreatorInput;
}

export const TodoCreator = ({
  initialValues = { label: "", tagIds: [] },
}: TodoCreatorProps) => {
  const createTodo = useCreateTodoMutation();
  const form = useForm({
    initialValues,
    schema: zodResolver(createTodoSchema),
  });

  const handleCreateTodo = (data: TodoCreatorInput) =>
    createTodo.mutate(data, { onSuccess: () => form.reset() });

  const handleControl = (icon: ReactNode) =>
    function Control(
      isOpened: boolean,
      setIsOpened: Dispatch<SetStateAction<boolean>>
    ) {
      return (
        <ActionIcon onClick={() => setIsOpened(!isOpened)}>{icon}</ActionIcon>
      );
    };

  return (
    <form onSubmit={form.onSubmit(handleCreateTodo)}>
      <Paper withBorder p={10} radius="lg">
        <Stack>
          <Group pr={10}>
            <Checkbox readOnly checked={false} radius="xl" size="xl" />
            <TextInput
              variant="unstyled"
              placeholder="Add Todo"
              size="lg"
              autoComplete="off"
              sx={{ flexGrow: 2 }}
              {...form.getInputProps("label")}
            />
            <TagSelectPopover
              control={handleControl(<Tag size={30} />)}
              value={toStringArray(form.values.tagIds)}
              onSelect={(values) => {
                const serializedTagIds = toNumberArray(filterNans(values));
                form.setFieldValue("tagIds", serializedTagIds);
              }}
              onTagCreate={(tag) =>
                form.setFieldValue("tagIds", [...form.values.tagIds, tag.id])
              }
            />
            <DateSelectPopover
              control={handleControl(<Calendar size={30} />)}
              value={form.values.expiresAt}
              onSelect={(value) => form.setFieldValue("expiresAt", value)}
            />
            <ActionIcon type="submit">
              <Plus size={30} />
            </ActionIcon>
          </Group>
        </Stack>
      </Paper>
    </form>
  );
};
