import { Avatar, Button } from "@mantine/core";
import type { NextPage } from "next";
import { PageMetadata } from "../common/components/PageMetadata";
import { useLogoutMutation } from "../modules/auth/hooks/useLogoutMutation";
import { TodoList } from "../modules/todo/components/TodoList";
import { useAddTodoModal } from "../modules/todo/hooks/useAddTodoModal";
import { useTodos } from "../modules/todo/hooks/useTodos";
import { UserMenu } from "../modules/user/components/UserMenu";

const Home: NextPage = () => {
  const { open } = useAddTodoModal();
  const { data } = useTodos();
  const logout = useLogoutMutation();

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
        <UserMenu control={<Avatar />} onLogout={() => logout.mutate()} />
      </main>
    </>
  );
};

export default Home;
