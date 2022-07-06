import { Avatar, Button } from "@mantine/core";
import { PageMetadata } from "../common/components/PageMetadata";
import { NextPageWithLayout } from "../common/types/next-page-with-layout.interface";
import { DashboardLayout } from "../modules/layout/components/DashboardLayout";
import { TodoList } from "../modules/todo/components/TodoList";
import { useAddTodoModal } from "../modules/todo/hooks/useAddTodoModal";
import { useTodos } from "../modules/todo/hooks/useTodos";
import { UserMenu } from "../modules/user/components/UserMenu";

const Home: NextPageWithLayout = () => {
  const { open } = useAddTodoModal();
  const { data } = useTodos();

  return (
    <>
      <PageMetadata title="Todo clone" />
      <TodoList
        data={[
          { id: 5, label: "Mown the law" },
          { id: 6, label: "Do homework" },
        ]}
      />
      <Button onClick={open} />
    </>
  );
};

Home.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Home;
