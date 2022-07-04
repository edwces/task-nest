import type { NextPage } from "next";
import { PageMetadata } from "../common/components/PageMetadata";
import { AuthGate } from "../modules/auth/components/AuthGate";
import { TodoList } from "../modules/todo/components/TodoList";

const Home: NextPage = () => {
  return (
    <AuthGate redirectUrl="/account/sign-up">
      <PageMetadata title="Todo clone" />
      <main>
        <TodoList
          data={[
            { id: 5, label: "Mown the law" },
            { id: 6, label: "Do homework" },
          ]}
        />
      </main>
    </AuthGate>
  );
};

export default Home;
