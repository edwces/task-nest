import { Popover, Select } from "@mantine/core";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { Repeat } from "../enums/repeat.enum";

type ControlFn = (
  isOpened: boolean,
  setIsOpened: Dispatch<SetStateAction<boolean>>
) => ReactNode;

interface DateSelectPopoverProps {
  control: ControlFn;
  value?: Repeat;
  onSelect?: (value: Repeat) => void;
}

export const repeatOptions = [
  { value: Repeat.NONE, label: "None" },
  { value: Repeat.DAILY, label: "Daily" },
  { value: Repeat.WEEKLY, label: "Weekly" },
  { value: Repeat.MONTHLY, label: "Monthly" },
];

export const RepeatSelectPopover = ({
  control,
  value = Repeat.NONE,
  onSelect = () => {},
}: DateSelectPopoverProps) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleChange = (value: Repeat) => {
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
      <Select data={repeatOptions} value={value} onChange={handleChange} />
    </Popover>
  );
};
