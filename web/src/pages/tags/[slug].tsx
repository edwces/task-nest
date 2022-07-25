import { Box, Stack } from "@mantine/core";
import { useRouter } from "next/router";
import { PageMetadata } from "../../common/components/PageMetadata";
import { useFilters } from "../../common/store/useFilters";
import { NextPageWithLayout } from "../../common/types/next-page-with-layout.interface";
import { DashboardLayout } from "../../modules/layout/components/DashboardLayout";
import { TodoControlBar } from "../../modules/todo/components/TodoControlBar";
import { TodoCreator } from "../../modules/todo/components/TodoCreator";
import { TodoList } from "../../modules/todo/components/TodoList";
import { useTodosByTagLabel } from "../../modules/todo/api/useTodosByTagLabel";
import { useCreateTodoMutation } from "../../modules/todo/api/useCreateTodoMutation";

const Tag: NextPageWithLayout = () => {
  const router = useRouter();
  const { values } = useFilters();
  const { data } = useTodosByTagLabel(
    { label: router.query.slug as string, query: values },
    {
      enabled: router.isReady,
    }
  );
  const createTodo = useCreateTodoMutation();

  return (
    <>
      <PageMetadata title="Todo clone" />
      <Stack spacing={40}>
        <TodoControlBar />
        <TodoCreator onCreate={(dto) => createTodo.mutate(dto)} />
        {data && (
          <Box p={10}>
            <TodoList data={data} />
          </Box>
        )}
      </Stack>
    </>
  );
};

Tag.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Tag;
