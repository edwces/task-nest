import { Popover } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import dayjs from "dayjs";
import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { getTodayDate } from "../util/date.util";

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
      <Calendar
        minDate={getTodayDate()}
        value={value}
        onChange={handleChange}
      />
    </Popover>
  );
};
