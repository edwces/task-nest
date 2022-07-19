import { Button, Group } from "@mantine/core";
import { Plus } from "tabler-icons-react";
import { useFilters } from "../../../common/store/useFilters";
import { useAddTodoModal } from "../hooks/useAddTodoModal";
import { TodoFilters, TodoFiltersPicker } from "./TodoFiltersPicker";

export function TodoControlBar() {
  const { open } = useAddTodoModal();
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
      <Button onClick={open} leftIcon={<Plus />}>
        Add Todo
      </Button>
    </Group>
  );
}
