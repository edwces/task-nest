import { ActionIcon, MultiSelect, Popover, SelectItem } from "@mantine/core";
import { useState } from "react";
import { Tag } from "tabler-icons-react";

interface TagSelectPopoverProps {
  tagsChoices?: (string | SelectItem)[];
  onTagCreate?: (label: string) => void;
  onTagChange?: (values: string[]) => void;
}

export function TagSelectPopover({
  tagsChoices = [],
  onTagCreate = () => {},
  onTagChange = () => {},
}: TagSelectPopoverProps) {
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
      <MultiSelect
        data={tagsChoices}
        placeholder="Pick a tag"
        onChange={onTagChange}
        clearable
        creatable
        searchable
        autoFocus
        getCreateLabel={(query) => `+ Create ${query}`}
        onCreate={onTagCreate}
        dropdownPosition="bottom"
      />
    </Popover>
  );
}
