import { ActionIcon, Group } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form/lib/use-form";
import { Plus, Tag as TagIcon } from "tabler-icons-react";
import { useCreateTagMutation } from "../../../tag/api/useCreateTagMutation";
import { useTags } from "../../../tag/api/useTags";
import { Tag } from "../../../tag/models/tag.model";
import { TagSelectPopover } from "../../../tag/components/TagSelectPopover";

interface TodoCreatorActionsProps {
  control: UseFormReturnType<any>;
}

export function TodoCreatorActions({ control }: TodoCreatorActionsProps) {
  const createTag = useCreateTagMutation();
  const { data } = useTags();

  const handleCreateTag = (label: string) => createTag.mutate({ label });

  const handleChangeTag = (values: string[]) => {
    const tagIds = values.map((value) => Number.parseInt(value));
    control.setFieldValue("tagIds", tagIds);
  };

  const handleTagOptions = (data: Tag[]) =>
    data.map((tag) => ({ value: tag.id.toString(), label: tag.label }));

  return (
    <Group>
      <TagSelectPopover
        control={(opened, setOpened) => (
          <ActionIcon onClick={() => setOpened(!opened)}>
            <TagIcon size={30} />
          </ActionIcon>
        )}
        options={data && handleTagOptions(data)}
        onCreateTag={handleCreateTag}
        onChangeTag={handleChangeTag}
      />
      <ActionIcon type="submit">
        <Plus size={30} />
      </ActionIcon>
    </Group>
  );
}
