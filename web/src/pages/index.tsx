import { Button } from "@mantine/core";
import { PageMetadata } from "../common/components/PageMetadata";
import { NextPageWithLayout } from "../common/types/next-page-with-layout.interface";
import { DashboardLayout } from "../modules/layout/components/DashboardLayout";
import { TodoList } from "../modules/todo/components/TodoList";
import { useAddTodoModal } from "../modules/todo/hooks/useAddTodoModal";
import { useTodos } from "../modules/todo/hooks/useTodos";

const Home: NextPageWithLayout = () => {
  const { open } = useAddTodoModal();
  const { data } = useTodos();

  return (
    <>
      <PageMetadata title="Todo clone" />
      {data && <TodoList data={data} />}
      <Button onClick={open} />
    </>
  );
};

Home.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Home;
