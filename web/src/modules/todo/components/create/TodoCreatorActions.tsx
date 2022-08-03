import { ActionIcon, Group } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form/lib/use-form";
import { Calendar, Plus, Tag as TagIcon } from "tabler-icons-react";
import { useCreateTagMutation } from "../../../tag/api/useCreateTagMutation";
import { Tag } from "../../../tag/models/tag.model";
import { TagSelectPopover } from "../../../tag/components/TagSelectPopover";
import { CalendarSelectPopover } from "../../../dates/components/CalendarSelectPopover";
import { useEffect, useState } from "react";

interface TodoCreatorActionsProps {
  control: UseFormReturnType<any>;
  tags?: ReadonlyArray<Tag>;
}

export function TodoCreatorActions({
  control,
  tags = [],
}: TodoCreatorActionsProps) {
  const createTag = useCreateTagMutation();
  const [expiredAt, setExpiredAt] = useState<Date | null>(new Date());
  const [selectedTagsIds, setSelectedTagsIds] = useState<string[]>([]);

  useEffect(() => {
    if (!control.values.tagIds || control.values.tagIds === [])
      setSelectedTagsIds([]);
  }, [control.values.tagIds]);

  const handleDateSelect = (value: Date | null) => {
    control.setFieldValue("expiresAt", value);
    setExpiredAt(value);
  };

  const handleCreateTag = (label: string) => {
    createTag.mutate(
      { label },
      {
        onSuccess: (tag) => {
          // set form and select fields with a new id
          // from a tag created by label in select
          // Note: We don't use state value here because
          // it doesn't change yet ? Maybe i could use something
          // like flushSync
          setSelectedTagsIds([...selectedTagsIds, tag.id.toString()]);
          const tagIds = [...selectedTagsIds, tag.id.toString()].map((value) =>
            Number.parseInt(value)
          );
          control.setFieldValue("tagIds", tagIds);
        },
      }
    );
  };

  const handleChangeTag = (values: string[]) => {
    // if a value is a newly created label for a tag
    // that doesn't exist yet omit it
    const convertedValues = values.filter((value) => {
      const num = Number(values[values.length - 1]);
      return Number.isInteger(num);
    });

    setSelectedTagsIds(convertedValues);
    const tagIds = convertedValues.map((value) => Number.parseInt(value));
    control.setFieldValue("tagIds", tagIds);
  };

  const handleTagOptions = (data: readonly Tag[]) =>
    data.map((tag) => ({ value: tag.id.toString(), label: tag.label }));

  return (
    <Group>
      <CalendarSelectPopover
        control={(opened, setOpened) => (
          <ActionIcon onClick={() => setOpened(!opened)}>
            <Calendar size={30} />
          </ActionIcon>
        )}
        value={expiredAt}
        onChange={handleDateSelect}
      />
      <TagSelectPopover
        control={(opened, setOpened) => (
          <ActionIcon onClick={() => setOpened(!opened)}>
            <TagIcon size={30} />
          </ActionIcon>
        )}
        value={selectedTagsIds}
        options={tags && handleTagOptions(tags)}
        onCreateTag={handleCreateTag}
        onChangeTag={handleChangeTag}
      />
      <ActionIcon type="submit">
        <Plus size={30} />
      </ActionIcon>
    </Group>
  );
}
