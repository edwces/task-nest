import { ActionIcon, Popover, Select, SelectItem } from "@mantine/core";
import { useState } from "react";
import { Tag } from "tabler-icons-react";

interface TagActionButtonProps {
  tagsChoices?: (string | SelectItem)[];
  onTagCreate?: (label: string) => void;
  onTagChange?: (value: string) => void;
}

export function TagActionButton({
  tagsChoices = [],
  onTagCreate = () => {},
  onTagChange = () => {},
}: TagActionButtonProps) {
  const [opened, setOpened] = useState(false);

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      target={
        <ActionIcon onClick={() => setOpened(!opened)}>
          <Tag size={30} />
        </ActionIcon>
      }
    >
      <Select
        data={tagsChoices}
        placeholder="Pick a tag"
        onChange={onTagChange}
        clearable
        creatable
        searchable
        getCreateLabel={(query) => `+ Create ${query}`}
        onCreate={onTagCreate}
      />
    </Popover>
  );
}
