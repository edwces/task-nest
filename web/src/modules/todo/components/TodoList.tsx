import { Stack } from "@mantine/core";
import { useRemoveTodoMutation } from "../hooks/useRemoveTodoMutation";
import { Todo } from "../models/todo.model";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  data?: ReadonlyArray<Todo>;
}

export function TodoList({ data = [] }: TodoListProps) {
  const removeTodo = useRemoveTodoMutation();

  return (
    <Stack>
      {data.map((todo) => (
        <TodoItem
          key={todo.id}
          label={todo.label}
          onCheck={() => removeTodo.mutate(todo.id)}
        />
      ))}
    </Stack>
  );
}
