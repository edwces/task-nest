import { Box, Button, Stack } from "@mantine/core";
import { PageMetadata } from "../common/components/PageMetadata";
import { useFilters } from "../common/store/useFilters";
import { NextPageWithLayout } from "../common/types/next-page-with-layout.interface";
import { DashboardLayout } from "../modules/layout/components/DashboardLayout";
import { TodoControlBar } from "../modules/todo/components/TodoControlBar";
import { TodoCreator } from "../modules/todo/components/TodoCreator";
import { TodoList } from "../modules/todo/components/TodoList";
import { useAddTodoMutation } from "../modules/todo/hooks/useAddTodoMutation";
import { useEditTodoModal } from "../modules/todo/hooks/useEditTodoModal";
import { useTodos } from "../modules/todo/hooks/useTodos";

const Home: NextPageWithLayout = () => {
  const values = useFilters((state) => state.values);
  const { data } = useTodos(values);
  const createTodo = useAddTodoMutation();
  const { open } = useEditTodoModal();

  return (
    <>
      <PageMetadata title="Todo clone" />
      <Stack spacing={40}>
        <Button onClick={open}>Open Edit</Button>
        <TodoControlBar />
        <TodoCreator onCreate={(dto) => createTodo.mutate(dto)} />
        {data && (
          <Box px={10}>
            <TodoList data={data} />
          </Box>
        )}
      </Stack>
    </>
  );
};

Home.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Home;
