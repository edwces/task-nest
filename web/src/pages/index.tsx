import type { NextPage } from "next";
import { TodoList } from "../modules/todo/components/TodoList";

const Home: NextPage = () => {
  return (
    <main>
      <TodoList
        data={[
          { id: 5, label: "Mown the law" },
          { id: 6, label: "Do homework" },
        ]}
      />
    </main>
  );
};

export default Home;
