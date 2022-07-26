import { Box, Stack } from "@mantine/core";
import { PageMetadata } from "../common/components/PageMetadata";
import { useFilters } from "../common/store/useFilters";
import { NextPageWithLayout } from "../common/types/next-page-with-layout.interface";
import { DashboardLayout } from "../modules/layout/components/DashboardLayout";
import { TodoControlBar } from "../modules/todo/components/TodoControlBar";
import { TodoCreator } from "../modules/todo/components/create/TodoCreator";
import { TodoList } from "../modules/todo/components/TodoList";
import { useTodos } from "../modules/todo/api/useTodos";
import { useCreateTodoMutation } from "../modules/todo/api/useCreateTodoMutation";

const Home: NextPageWithLayout = () => {
  const values = useFilters((state) => state.values);
  const { data } = useTodos(values);

  return (
    <>
      <PageMetadata title="Todo clone" />
      <Stack spacing={40}>
        <TodoControlBar />
        <TodoCreator />
        {data && (
          <Box px={10}>
            <TodoList todos={data} />
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
