import { Group } from "@mantine/core";
import { useFilters } from "../../../../common/store/useFilters";
import { TodoSortSelect } from "./TodoSortSelect";

export function TodoControlBar() {
  const dispatch = useFilters((state) => state.dispatch);

  return (
    <Group position="apart" align="center">
      <TodoSortSelect onSortApply={dispatch} />
    </Group>
  );
}
