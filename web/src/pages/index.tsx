import { Button, Center, Group } from "@mantine/core";
import { useState } from "react";
import { Plus } from "tabler-icons-react";
import { PageMetadata } from "../common/components/PageMetadata";
import { NextPageWithLayout } from "../common/types/next-page-with-layout.interface";
import { DashboardLayout } from "../modules/layout/components/DashboardLayout";
import { TodoFilterBar } from "../modules/todo/components/TodoFilterBar";
import { TodoList } from "../modules/todo/components/TodoList";
import { useAddTodoModal } from "../modules/todo/hooks/useAddTodoModal";
import { useTodos } from "../modules/todo/hooks/useTodos";
import { TodosQuery } from "../modules/todo/types/add-todo-query.interface";

const Home: NextPageWithLayout = () => {
  const { open } = useAddTodoModal();
  const [filters, setFilters] = useState<TodosQuery>({});
  const { data } = useTodos(filters);

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

Home.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Home;
