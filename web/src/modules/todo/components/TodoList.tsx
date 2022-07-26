import { useRemoveTodoMutation } from "../api/useRemoveTodoMutation";
import { Todo } from "../models/todo.model";
import { TodoItem } from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";
import { Stack } from "@mantine/core";
import { useEditTodoModal } from "../hooks/useEditTodoModal";

const MotionStack = motion(Stack);

interface TodoListProps {
  todos?: ReadonlyArray<Todo>;
}

// 1 Approach - same as here logic in TodoList
// - Not to Many Props
// - handles both logic and UI
// 2 Approach - onEdit, onCheck Props that give todoId
// - extra Props + unnecesary rerenders
// - pure component without Logic

export function TodoList({ todos = [] }: TodoListProps) {
  const removeTodo = useRemoveTodoMutation();
  const { open } = useEditTodoModal();

  const handleCheck = (id: number) => removeTodo.mutate(id);
  const handleEdit = (id: number) => open({ todoId: id });

  return (
    <MotionStack layout>
      <AnimatePresence>
        {todos.map((todo) => (
          <motion.div
            layout
            key={todo.id}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <TodoItem
              label={todo.label}
              onCheck={() => handleCheck(todo.id)}
              onEdit={() => handleEdit(todo.id)}
              tags={todo.tags}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </MotionStack>
  );
}
