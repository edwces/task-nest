import { ActionIcon, Badge } from "@mantine/core";
import { Calendar, X } from "tabler-icons-react";

interface TodoDateBadgeProps {
  date: string;
  onClear?: () => void;
}

export const TodoDateBadge = ({ date, onClear }: TodoDateBadgeProps) => {
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
