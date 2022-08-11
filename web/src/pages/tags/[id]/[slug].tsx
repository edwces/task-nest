import { Box, Stack } from "@mantine/core";
import { useRouter } from "next/router";
import { PageMetadata } from "../../../common/components/PageMetadata";
import { useFilters } from "../../../common/store/useFilters";
import { NextPageWithLayout } from "../../../common/interfaces/next-page-with-layout.interface";
import { DashboardLayout } from "../../../modules/dashboard/DashboardLayout";
import { TodoControlBar } from "../../../modules/todo/components/list/TodoControlBar";
import { TodoCreator } from "../../../modules/todo/components/create/TodoCreator";
import { TodoList } from "../../../modules/todo/components/list/TodoList";
import { useTodosByTagLabel } from "../../../modules/todo/api/useTodosByTagLabel";
import { AuthGate } from "../../../modules/auth/components/account/AuthGate";
import { Route } from "../../../common/enums/route.enum";

const Tag: NextPageWithLayout = () => {
  const router = useRouter();
  const { values } = useFilters();
  const { data } = useTodosByTagLabel(
    {
      label: router.query.slug as string,
      query: { ...values, isChecked: false },
    },
    {
      enabled: router.isReady,
    }
  );

  // We need to add key to TodoCreator, because useRouter does not
  // change beetwen dynamic pages and it also causes that our page will not
  // refetch
  return (
    <>
      <PageMetadata title="Todo clone" />
      <Stack spacing={40} pt={20}>
        <TodoControlBar title={router.query.slug as string} />
        <TodoCreator
          key={`tag_${router.query.id}`}
          initialValues={{
            label: "",
            tagIds: [Number.parseInt(router.query.id as string)],
          }}
        />
        <Box px={10}>
          <TodoList todos={data} />
        </Box>
      </Stack>
    </>
  );
};

Tag.getLayout = (page) => {
  return (
    <AuthGate redirectUrl={Route.SIGN_IN}>
      <DashboardLayout>{page}</DashboardLayout>
    </AuthGate>
  );
};

export default Tag;
