import { Group } from "@mantine/core";
import { useFilters } from "../../../common/store/useFilters";
import { TodoFilters, TodoFiltersPicker } from "./TodoFiltersPicker";

export function TodoControlBar() {
  const { setNewest, setOldest } = useFilters();

  const reduce = (values: TodoFilters) => {
    switch (values.sort) {
      case "OLDEST":
        setOldest();
        break;
      case "NEWEST":
        setNewest();
        break;
    }
  };

  return (
    <Group position="apart" align="center">
      <TodoFiltersPicker onFiltersApply={reduce} />
    </Group>
  );
}
