import { Todo } from "../../models/todo.model";
import { TodoItem } from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";
import { Stack } from "@mantine/core";
import { useEditTodoModal } from "../../hooks/useEditTodoModal";
import { formatDate } from "../../../dates/util/date.util";
import { useUpdateTodoMutation } from "../../api/useUpdateTodoMutation";
import { Repeat } from "../../../dates/enums/repeat.enum";
import { useTickTodoMutation } from "../../api/useTickTodoMutation";

const MotionStack = motion(Stack);

interface TodoListProps {
  todos?: ReadonlyArray<Todo>;
  areTicked?: boolean;
}

export function TodoList({ todos = [], areTicked = false }: TodoListProps) {
  const removeTodo = useTickTodoMutation();
  const { open } = useEditTodoModal();
  const updateTodo = useUpdateTodoMutation();

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
              expiresAt={todo.expiresAt && formatDate(new Date(todo.expiresAt))}
              isExpired={todo.isExpired}
              isBookmarked={todo.isBookmarked}
              isRepeating={todo.repeat !== Repeat.NONE}
              label={todo.label}
              onCheck={() => removeTodo.mutate(todo.id)}
              onEdit={() => open({ todoId: todo.id })}
              onBookmark={() =>
                updateTodo.mutate({
                  id: todo.id,
                  data: { isBookmarked: !todo.isBookmarked },
                })
              }
              isTicked={areTicked}
              tags={todo.tags}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </MotionStack>
  );
}
