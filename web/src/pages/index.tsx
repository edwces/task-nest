import { Box, Stack } from "@mantine/core";
import { PageMetadata } from "../common/components/PageMetadata";
import { useFilters } from "../common/store/useFilters";
import { NextPageWithLayout } from "../common/interfaces/next-page-with-layout.interface";
import { DashboardLayout } from "../modules/dashboard/DashboardLayout";
import { TodoControlBar } from "../modules/todo/components/list/TodoControlBar";
import { TodoCreator } from "../modules/todo/components/create/TodoCreator";
import { TodoList } from "../modules/todo/components/list/TodoList";
import { useTodos } from "../modules/todo/api/useTodos";
import { AuthGate } from "../modules/auth/components/account/AuthGate";
import { Route } from "../common/enums/route.enum";

const Home: NextPageWithLayout = () => {
  const values = useFilters((state) => state.values);
  const { data } = useTodos(values);

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

Home.getLayout = (page) => {
  return (
    <AuthGate redirectUrl={Route.SIGN_IN}>
      <DashboardLayout>{page}</DashboardLayout>;
    </AuthGate>
  );
};

export default Home;
