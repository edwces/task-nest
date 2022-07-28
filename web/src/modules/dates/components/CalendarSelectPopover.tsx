import { Popover } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";

type ControlFn = (
  opened: boolean,
  setOpened: Dispatch<SetStateAction<boolean>>
) => ReactNode;

type CalendarSelectPopoverProps = {
  control: ControlFn;
  value?: Date | null;
  onChange?: (value: Date | null) => void;
};

export const CalendarSelectPopover = ({
  control,
  value,
  onChange,
}: CalendarSelectPopoverProps) => {
  const [opened, setOpened] = useState(false);
  return (
    <Popover
      target={control(opened, setOpened)}
      opened={opened}
      onClose={() => setOpened(false)}
      position="bottom"
    >
      <Calendar value={value} onChange={onChange} />
    </Popover>
  );
};
