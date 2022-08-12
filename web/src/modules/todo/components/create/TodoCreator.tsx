import {
  ActionIcon,
  Badge,
  Checkbox,
  Group,
  Paper,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { Calendar, Plus, Repeat as RepeatIcon, Tag } from "tabler-icons-react";
import { z } from "zod";
import { DateSelectPopover } from "../../../dates/components/DateSelectPopover";
import { DateBadge } from "../../../dates/components/DateBadge";
import { formatDate } from "../../../dates/util/date.util";
import { TagSelectPopover } from "../../../tag/components/TagSelectPopover";
import { useCreateTodoMutation } from "../../api/useCreateTodoMutation";
import {
  filterNans,
  toNumberArray,
  toStringArray,
} from "../../util/array.util";
import { useTags } from "../../../tag/api/useTags";
import { RepeatSelectPopover } from "../../../dates/components/RepeatSelectPopover";
import { Repeat } from "../../../dates/enums/repeat.enum";

const createTodoSchema = z.object({
  label: z.string().min(1).max(300),
  tagIds: z.number().array(),
  expiresAt: z.date().nullable().optional(),
  repeat: z.nativeEnum(Repeat).optional(),
  isBookmarked: z.boolean().optional(),
});

type TodoCreatorInput = z.input<typeof createTodoSchema>;

interface TodoCreatorProps {
  initialValues?: TodoCreatorInput;
}

export const TodoCreator = ({
  initialValues = { label: "", tagIds: [] },
}: TodoCreatorProps) => {
  const tags = useTags();
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

  const TagsBadges =
    form.values.tagIds &&
    tags.data &&
    form.values.tagIds.map((id) => (
      <Badge key={id}>{tags.data.find((tag) => tag.id === id)?.label}</Badge>
    ));

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
            <RepeatSelectPopover
              control={handleControl(<RepeatIcon size={30} />)}
              value={form.values.repeat}
              onSelect={(value) => form.setFieldValue("repeat", value)}
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
          <Group>
            {form.values.repeat && form.values.repeat !== Repeat.NONE && (
              <RepeatIcon size={18} />
            )}
            {form.values.expiresAt && (
              <DateBadge
                date={formatDate(form.values.expiresAt)}
                onClear={() => form.setFieldValue("expiresAt", null)}
              />
            )}
            {TagsBadges}
          </Group>
        </Stack>
      </Paper>
    </form>
  );
};
