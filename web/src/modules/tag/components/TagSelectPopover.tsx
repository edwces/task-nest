import { MultiSelect, Popover, SelectItem } from "@mantine/core";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { useCreateTagMutation } from "../api/useCreateTagMutation";
import { useTags } from "../api/useTags";
import { Tag } from "../models/tag.model";

type ControlFn = (
  isOpened: boolean,
  setIsOpened: Dispatch<SetStateAction<boolean>>
) => ReactNode;

interface TagSelectPopoverProps {
  control: ControlFn;
  onSelect?: (values: string[]) => void;
  onTagCreate?: (tag: Tag) => void;
  value?: string[];
}

export function TagSelectPopover({
  control,
  onSelect,
  onTagCreate = () => {},
  value = [],
}: TagSelectPopoverProps) {
  const { data } = useTags();
  const createTag = useCreateTagMutation();
  const [isOpened, setIsOpened] = useState(false);

  const toOptions = (data?: Tag[]) =>
    data
      ? data.map((tag) => ({ value: tag.id.toString(), label: tag.label }))
      : [];

  const getCreateLabel = (query: string) => `+ Create ${query}`;

  const handleCreate = (label: string) => {
    createTag.mutate({ label }, { onSuccess: (tag) => onTagCreate(tag) });
  };

  return (
    <Popover
      opened={isOpened}
      onClose={() => setIsOpened(false)}
      target={control(isOpened, setIsOpened)}
    >
      <MultiSelect
        value={value}
        data={toOptions(data)}
        placeholder="Pick a tag"
        onChange={onSelect}
        clearable
        creatable
        searchable
        autoFocus
        getCreateLabel={getCreateLabel}
        onCreate={handleCreate}
        dropdownPosition="bottom"
      />
    </Popover>
  );
}
