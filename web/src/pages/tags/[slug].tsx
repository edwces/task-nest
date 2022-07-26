import { Box, Stack } from "@mantine/core";
import { useRouter } from "next/router";
import { PageMetadata } from "../../common/components/PageMetadata";
import { useFilters } from "../../common/store/useFilters";
import { NextPageWithLayout } from "../../common/interfaces/next-page-with-layout.interface";
import { DashboardLayout } from "../../modules/dashboard/DashboardLayout";
import { TodoControlBar } from "../../modules/todo/components/list/TodoControlBar";
import { TodoCreator } from "../../modules/todo/components/create/TodoCreator";
import { TodoList } from "../../modules/todo/components/list/TodoList";
import { useTodosByTagLabel } from "../../modules/todo/api/useTodosByTagLabel";

const Tag: NextPageWithLayout = () => {
  const router = useRouter();
  const { values } = useFilters();
  const { data } = useTodosByTagLabel(
    { label: router.query.slug as string, query: values },
    {
      enabled: router.isReady,
    }
  );
  return (
    <>
      <PageMetadata title="Todo clone" />
      <Stack spacing={40}>
        <TodoControlBar />
        <TodoCreator />
        <Box px={10}>
          <TodoList todos={data} />
        </Box>
      </Stack>
    </>
  );
};

Tag.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Tag;
