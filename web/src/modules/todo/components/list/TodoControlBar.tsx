import { Group, Text, Title } from "@mantine/core";
import { useFilters } from "../../../../common/store/useFilters";
import { formatDate } from "../../../dates/util/date.util";
import { TodoSortSelect } from "./TodoSortSelect";

interface TodoControlBarProps {
  title: string;
}

export function TodoControlBar({ title }: TodoControlBarProps) {
  const dispatch = useFilters((state) => state.dispatch);

  return (
    <Group position="apart" align="flex-end">
      <Group align="flex-end">
        <Title order={2}>
          {title}
          <Text pl={10} size="xs" component="span" color="dimmed">
            {formatDate(new Date())}
          </Text>
        </Title>
      </Group>
      <TodoSortSelect onSortApply={dispatch} />
    </Group>
  );
}
