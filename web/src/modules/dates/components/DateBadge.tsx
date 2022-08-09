import { ActionIcon, Badge } from "@mantine/core";
import { Calendar, X } from "tabler-icons-react";

interface DateBadgeProps {
  date: string;
  onClear?: () => void;
}

export const DateBadge = ({ date, onClear }: DateBadgeProps) => {
  return (
    <Badge
      variant="light"
      size="lg"
      radius="xl"
      leftSection={
        <ActionIcon variant="transparent" color="violet">
          <Calendar size={18} />
        </ActionIcon>
      }
      rightSection={
        <ActionIcon variant="transparent" onClick={onClear} color="violet">
          <X size={18} />
        </ActionIcon>
      }
    >
      {date}
    </Badge>
  );
};
