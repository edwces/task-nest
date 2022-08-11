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

const Week: NextPageWithLayout = () => {
  const values = useFilters((state) => state.values);
  const { data } = useTodos({ ...values, due: "week", isChecked: false });

  const getSundayDate = () => {
    const now = new Date();
    const day = now.getDate() - now.getDay() + 7;
    now.setDate(day);
    now.setHours(0, 0, 0, 0);
    return now;
  };

  return (
    <>
      <PageMetadata title="Todo clone" />
      <Stack spacing={40} pt={20}>
        <TodoControlBar title="This Week" />
        <TodoCreator
          initialValues={{ label: "", expiresAt: getSundayDate(), tagIds: [] }}
        />
        <Box px={10}>
          <TodoList todos={data} />
        </Box>
      </Stack>
    </>
  );
};

Week.getLayout = (page) => {
  return (
    <AuthGate redirectUrl={Route.SIGN_IN}>
      <DashboardLayout>{page}</DashboardLayout>
    </AuthGate>
  );
};

export default Week;
