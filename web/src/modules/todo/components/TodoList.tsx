import { Stack } from "@mantine/core";
import { Todo } from "../models/todo.model";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  data?: ReadonlyArray<Todo>;
}

export function TodoList({ data = [] }: TodoListProps) {
  return (
    <Stack>
      {data.map((todo) => (
        <TodoItem key={todo.id} label={todo.label} />
      ))}
    </Stack>
  );
}
