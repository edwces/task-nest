import { Popover } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";

type ControlFn = (
  isOpened: boolean,
  setIsOpened: Dispatch<SetStateAction<boolean>>
) => ReactNode;

interface DateSelectPopoverProps {
  control: ControlFn;
  value?: Date | null;
  onSelect?: (value: Date | null) => void;
}

export const DateSelectPopover = ({
  control,
  value,
  onSelect = () => {},
}: DateSelectPopoverProps) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleChange = (value: Date | null) => {
    onSelect(value);
    setIsOpened(!isOpened);
  };

  return (
    <Popover
      target={control(isOpened, setIsOpened)}
      opened={isOpened}
      onClose={() => setIsOpened(false)}
      position="bottom"
    >
      <Calendar value={value} onChange={handleChange} />
    </Popover>
  );
};
