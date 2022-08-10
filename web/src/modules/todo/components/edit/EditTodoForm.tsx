import {
  ActionIcon,
  Badge,
  Button,
  Checkbox,
  CloseButton,
  Divider,
  Group,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { Dispatch, ReactNode, SetStateAction } from "react";
import {
  AlignLeft,
  Calendar,
  Edit,
  Plus,
  Tag as TagIcon,
} from "tabler-icons-react";
import { z } from "zod";
import { DateSelectPopover } from "../../../dates/components/DateSelectPopover";
import { formatDate } from "../../../dates/util/date.util";
import { useTags } from "../../../tag/api/useTags";
import { TagSelectPopover } from "../../../tag/components/TagSelectPopover";
import {
  filterNans,
  toNumberArray,
  toStringArray,
} from "../../util/array.util";

const updateTodoSchema = z.object({
  label: z.string().min(1).max(300),
  description: z.string().max(1000),
  tagIds: z.number().array(),
  expiresAt: z.date().nullable(),
});

type EditTodoFormInput = z.infer<typeof updateTodoSchema>;

interface EditTodoFormProps {
  initialValues: EditTodoFormInput;
  onEdit: (values: EditTodoFormInput) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function EditTodoForm({
  initialValues,
  onEdit,
  onCancel,
  isSubmitting = false,
}: EditTodoFormProps) {
  const tags = useTags();
  const form = useForm({
    initialValues,
    schema: zodResolver(updateTodoSchema),
  });

  const handleControl = (icon: ReactNode) =>
    function Control(
      isOpened: boolean,
      setIsOpened: Dispatch<SetStateAction<boolean>>
    ) {
      return (
        <ActionIcon radius="xl" onClick={() => setIsOpened(!isOpened)}>
          {icon}
        </ActionIcon>
      );
    };

  const TagsBadges =
    form.values.tagIds &&
    tags.data &&
    form.values.tagIds.map((id) => (
      <Badge key={id}>{tags.data.find((tag) => tag.id === id)?.label}</Badge>
    ));

  return (
    <form onSubmit={form.onSubmit(onEdit)}>
      <Group align="flex-start" noWrap>
        <Checkbox readOnly checked={false} radius="xl" size="xl" />
        <Stack>
          <TextInput
            variant="unstyled"
            autoComplete="off"
            styles={{ input: { fontFamily: "Montserrat", fontSize: 27 } }}
            {...form.getInputProps("label")}
          />
          <Divider />
          <Stack>
            <Group>
              <TagIcon size={18} />
              <Text>Tags:</Text>
              {TagsBadges}
              <TagSelectPopover
                control={handleControl(<Plus size={18} />)}
                value={toStringArray(form.values.tagIds)}
                onSelect={(values) => {
                  const serializedTagIds = toNumberArray(filterNans(values));
                  form.setFieldValue("tagIds", serializedTagIds);
                }}
                onTagCreate={(tag) =>
                  form.setFieldValue("tagIds", [...form.values.tagIds, tag.id])
                }
              />
            </Group>
            <Group>
              <Calendar size={18} />
              <Text>Expires In:</Text>
              <Group spacing={5}>
                <Text color="dimmed">
                  {form.values.expiresAt
                    ? formatDate(form.values.expiresAt)
                    : "Not set"}
                </Text>
                {form.values.expiresAt && (
                  <CloseButton
                    radius="xl"
                    onClick={() => form.setFieldValue("expiresAt", null)}
                  />
                )}
              </Group>
              <DateSelectPopover
                control={handleControl(<Edit size={18} />)}
                value={form.values.expiresAt}
                onSelect={(value) => form.setFieldValue("expiresAt", value)}
              />
            </Group>
          </Stack>
          <Divider />
          <Group>
            <AlignLeft size={25} />
            <Text>Description:</Text>
          </Group>
          <Textarea
            minRows={10}
            maxRows={10}
            autosize
            {...form.getInputProps("description")}
          />
          <Group position="right" mt={10}>
            <Button
              type="reset"
              variant="default"
              onClick={() => {
                form.reset();
                onCancel();
              }}
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
