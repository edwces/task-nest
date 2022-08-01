import { ActionIcon, Group } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form/lib/use-form";
import { Calendar, Plus, Tag as TagIcon } from "tabler-icons-react";
import { useCreateTagMutation } from "../../../tag/api/useCreateTagMutation";
import { Tag } from "../../../tag/models/tag.model";
import { TagSelectPopover } from "../../../tag/components/TagSelectPopover";
import { CalendarSelectPopover } from "../../../dates/components/CalendarSelectPopover";
import { useState } from "react";

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

  const handleDateSelect = (value: Date | null) => {
    control.setFieldValue("expiresAt", value);
    setExpiredAt(value);
  };

  const handleCreateTag = (label: string) => createTag.mutate({ label });

  const handleChangeTag = (values: string[]) => {
    const tagIds = values.map((value) => Number.parseInt(value));
    control.setFieldValue("tagIds", tagIds);
  };

  const handleTagOptions = (data: Tag[]) =>
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
