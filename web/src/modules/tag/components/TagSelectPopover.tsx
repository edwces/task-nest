import { MultiSelect, Popover, SelectItem } from "@mantine/core";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

type ControlFn = (
  opened: boolean,
  setOpened: Dispatch<SetStateAction<boolean>>
) => ReactNode;

interface TagSelectPopoverProps {
  options?: (string | SelectItem)[];
  onCreateTag?: (label: string) => void;
  onChangeTag?: (values: string[]) => void;
  control: ControlFn;
}

export function TagSelectPopover({
  options = [],
  onCreateTag,
  onChangeTag,
  control,
}: TagSelectPopoverProps) {
  const [opened, setOpened] = useState(false);

  const getCreateLabel = (query: string) => `+ Create ${query}`;

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      target={control(opened, setOpened)}
    >
      <MultiSelect
        data={options}
        placeholder="Pick a tag"
        onChange={onChangeTag}
        clearable
        creatable
        searchable
        autoFocus
        getCreateLabel={getCreateLabel}
        onCreate={onCreateTag}
        dropdownPosition="bottom"
      />
    </Popover>
  );
}
