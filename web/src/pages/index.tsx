import { Accordion, Stack } from "@mantine/core";
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
  const todos = useTodos({ ...values, isChecked: false, isExpired: false });
  const expiredTodos = useTodos({
    ...values,
    isExpired: true,
    isChecked: false,
  });
  const tickedTodos = useTodos({
    ...values,
    isChecked: true,
    checkedAt: "today",
  });

  return (
    <>
      <PageMetadata title="Todo clone" />
      <Stack spacing={40} pt={20}>
        <TodoControlBar title="All" />
        <TodoCreator />
        <Stack px={10}>
          <TodoList todos={todos.data} />
          <Accordion>
            <Accordion.Item label="Expired">
              <TodoList todos={expiredTodos.data} />
            </Accordion.Item>
            <Accordion.Item label="Ticked Today">
              <TodoList todos={tickedTodos.data} />
            </Accordion.Item>
          </Accordion>
        </Stack>
      </Stack>
    </>
  );
};

Home.getLayout = (page) => {
  return (
    <AuthGate redirectUrl={Route.SIGN_IN}>
      <DashboardLayout>{page}</DashboardLayout>
    </AuthGate>
  );
};

export default Home;
