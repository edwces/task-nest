import { useRemoveTodoMutation } from "../hooks/useRemoveTodoMutation";
import { Todo } from "../models/todo.model";
import { TodoItem } from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";
import { Stack } from "@mantine/core";

const MotionStack = motion(Stack);

interface TodoListProps {
  data?: ReadonlyArray<Todo>;
}

export function TodoList({ data = [] }: TodoListProps) {
  const removeTodo = useRemoveTodoMutation();

  return (
    <MotionStack layout>
      <AnimatePresence>
        {data.map((todo) => (
          <motion.div
            layout
            key={todo.id}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <TodoItem
              label={todo.label}
              onCheck={() => removeTodo.mutate(todo.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </MotionStack>
  );
}
