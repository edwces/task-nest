import { Accordion, Box, Container, Stack } from "@mantine/core";
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

const Bookmarks: NextPageWithLayout = () => {
  const values = useFilters((state) => state.values);
  const todos = useTodos({
    ...values,
    isBookmarked: true,
    isChecked: false,
    isExpired: false,
  });
  const expiredTodos = useTodos({
    ...values,
    isBookmarked: true,
    isChecked: false,
    isExpired: true,
  });
  const tickedTodos = useTodos({
    ...values,
    isBookmarked: true,
    isChecked: true,
    checkedAt: "today",
  });

  return (
    <>
      <PageMetadata title="Todo clone" />
      <Stack spacing={40} pt={20}>
        <TodoControlBar title="Bookmarks" />
        <TodoCreator
          initialValues={{ label: "", isBookmarked: true, tagIds: [] }}
        />
        <Stack spacing={20} px={10}>
          <TodoList todos={todos.data} />
          <Accordion>
            <Accordion.Item label="Expired">
              <Container py={20} fluid>
                <TodoList todos={expiredTodos.data} />
              </Container>
            </Accordion.Item>
            <Accordion.Item label="Ticked today">
              <Container py={20} fluid>
                <TodoList areTicked todos={tickedTodos.data} />
              </Container>
            </Accordion.Item>
          </Accordion>
        </Stack>
      </Stack>
    </>
  );
};

Bookmarks.getLayout = (page) => {
  return (
    <AuthGate redirectUrl={Route.SIGN_IN}>
      <DashboardLayout>{page}</DashboardLayout>
    </AuthGate>
  );
};

export default Bookmarks;
