import {
  Button,
  Group,
  Stack,
  Textarea,
  TextInput,
  Text,
  Checkbox,
  Divider,
  Badge,
  ActionIcon,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useState } from "react";
import { AlignLeft, Calendar, Edit, Plus } from "tabler-icons-react";
import { z } from "zod";
import { CalendarSelectPopover } from "../../../dates/components/CalendarSelectPopover";
import { formatDate } from "../../../dates/util/date.util";
import { useCreateTagMutation } from "../../../tag/api/useCreateTagMutation";
import { TagSelectPopover } from "../../../tag/components/TagSelectPopover";
import { Tag } from "../../../tag/models/tag.model";
import { UpdateTodoDTO } from "../../dto/update-todo.dto";

const editTodoSchema = z.object({
  label: z.string().min(1).max(20).optional(),
  description: z.string().max(1000).optional(),
  tagIds: z.number().array().optional(),
  expiresAt: z.string().optional(),
});

interface EditTodoFormProps {
  initialValues: UpdateTodoDTO;
  onEdit?: (values: UpdateTodoDTO) => void;
  isSubmitting?: boolean;
  tags: ReadonlyArray<Tag>;
}

export function EditTodoForm({
  initialValues,
  onEdit = () => {},
  isSubmitting = false,
  tags,
}: EditTodoFormProps) {
  const handleTagOptions = (data: readonly Tag[]) => {
    return data.map((tag) => ({ value: tag.id.toString(), label: tag.label }));
  };

  const form = useForm({ initialValues, schema: zodResolver(editTodoSchema) });
  const createTag = useCreateTagMutation();
  const [selectedTagsIds, setSelectedTagsIds] = useState<string[]>(
    initialValues.tagIds!.map((item) => item.toString())
  );
  const [expiredAt, setExpiredAt] = useState<Date | null>(
    initialValues.expiresAt ? new Date(initialValues.expiresAt) : null
  );
  const handleCreateTag = (label: string) => {
    createTag.mutate(
      { label },
      {
        onSuccess: (tag) => {
          setSelectedTagsIds([...selectedTagsIds, tag.id.toString()]);
          const tagIds = [...selectedTagsIds, tag.id.toString()].map((value) =>
            Number.parseInt(value)
          );
          form.setFieldValue("tagIds", tagIds);
        },
      }
    );
  };

  const handleChangeTag = (values: string[]) => {
    // if a value is a newly created label for a tag
    // that doesn't exist yet omit it
    const convertedValues = values.filter((value) => {
      const num = Number(value);
      return Number.isInteger(num);
    });
    setSelectedTagsIds(convertedValues);
    const tagIds = convertedValues.map((value) => Number.parseInt(value));
    form.setFieldValue("tagIds", tagIds);
  };

  const handleDateSelect = (value: Date | null) => {
    form.setFieldValue("expiresAt", value ? formatDate(value) : undefined);
    setExpiredAt(value);
  };

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
            <Group>
              <Text>Tags:</Text>
              {form.values.tagIds?.map((id) => (
                <Badge key={id}>
                  {tags.find((tag) => tag.id === id)?.label}
                </Badge>
              ))}
              <TagSelectPopover
                value={selectedTagsIds}
                options={handleTagOptions(tags)}
                control={(opened, setOpened) => (
                  <ActionIcon
                    color="gray"
                    size="sm"
                    variant="filled"
                    onClick={() => setOpened(!opened)}
                    radius="xl"
                  >
                    <Plus size={20} />
                  </ActionIcon>
                )}
                onCreateTag={handleCreateTag}
                onChangeTag={handleChangeTag}
              />
            </Group>
            <Group>
              <Text>Expires In:</Text>
              <Group spacing={7}>
                <Calendar size={18} />
                <Text color="dimmed">
                  {expiredAt ? formatDate(expiredAt) : null}
                </Text>
              </Group>
              <CalendarSelectPopover
                control={(opened, setOpened) => (
                  <ActionIcon
                    color="gray"
                    variant="filled"
                    size="md"
                    radius="xl"
                    onClick={() => setOpened(!opened)}
                  >
                    <Edit size={20} />
                  </ActionIcon>
                )}
                value={expiredAt}
                onChange={handleDateSelect}
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
            autosize
            {...form.getInputProps("description")}
          />
          <Group position="right" mt={10}>
            <Button
              variant="default"
              type="reset"
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
