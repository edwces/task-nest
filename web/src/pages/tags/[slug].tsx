import { Stack } from "@mantine/core";
import { useRouter } from "next/router";
import { PageMetadata } from "../../common/components/PageMetadata";
import { useFilters } from "../../common/store/useFilters";
import { NextPageWithLayout } from "../../common/types/next-page-with-layout.interface";
import { DashboardLayout } from "../../modules/layout/components/DashboardLayout";
import { TodoControlBar } from "../../modules/todo/components/TodoControlBar";
import { TodoList } from "../../modules/todo/components/TodoList";
import { useTodosByTagLabel } from "../../modules/todo/hooks/useTodosByTagLabel";

const Tag: NextPageWithLayout = () => {
  const router = useRouter();
  const { values } = useFilters();
  const { data } = useTodosByTagLabel(router.query.slug as string, values, {
    enabled: router.isReady,
  });

  return (
    <>
      <PageMetadata title="Todo clone" />
      <Stack spacing={40}>
        <TodoControlBar />
        {data && <TodoList data={data} />}
      </Stack>
    </>
  );
};

Tag.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Tag;
