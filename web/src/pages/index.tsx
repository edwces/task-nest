import { Button } from "@mantine/core";
import type { NextPage } from "next";
import { PageMetadata } from "../common/components/PageMetadata";
import { TodoList } from "../modules/todo/components/TodoList";
import { useAddTodoModal } from "../modules/todo/hooks/useAddTodoModal";

const Home: NextPage = () => {
  const { open } = useAddTodoModal();

  return (
    <>
      <PageMetadata title="Todo clone" />
      <main>
        <TodoList
          data={[
            { id: 5, label: "Mown the law" },
            { id: 6, label: "Do homework" },
          ]}
        />
        <Button onClick={open} />
      </main>
    </>
  );
};

export default Home;
