import { Button, Center, Group } from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";
import { Plus } from "tabler-icons-react";
import { PageMetadata } from "../../common/components/PageMetadata";
import { NextPageWithLayout } from "../../common/types/next-page-with-layout.interface";
import { DashboardLayout } from "../../modules/layout/components/DashboardLayout";
import { TodoFilterBar } from "../../modules/todo/components/TodoFilterBar";
import { TodoList } from "../../modules/todo/components/TodoList";
import { useAddTodoModal } from "../../modules/todo/hooks/useAddTodoModal";
import { useTodosByTagLabel } from "../../modules/todo/hooks/useTodosByTagLabel";
import { TodosQuery } from "../../modules/todo/types/add-todo-query.interface";

// TODO: Remove some duplications between different todos dashboards
const Tag: NextPageWithLayout = () => {
  const router = useRouter();
  const { open } = useAddTodoModal();
  const [filters, setFilters] = useState<TodosQuery>({});
  const { data } = useTodosByTagLabel(router.query.slug as string, filters, {
    enabled: router.isReady,
  });

  return (
    <>
      <PageMetadata title="Todo clone" />
      <Group position="apart" align="center">
        <TodoFilterBar
          onFiltersApply={(values) => {
            const [sort, direction] = values.sort.split(":");
            setFilters({ sort, direction });
          }}
        />
        <Button onClick={open} leftIcon={<Plus />}>
          Add Todo
        </Button>
      </Group>
      {data && (
        <Center>
          <TodoList data={data} />
        </Center>
      )}
    </>
  );
};

Tag.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Tag;
