import type { NextPage } from "next";
import { AuthGate } from "../modules/auth/components/AuthGate";
import { SignInForm } from "../modules/auth/components/SignInForm";
import { SignUpForm } from "../modules/auth/components/SignUpForm";
import { TodoList } from "../modules/todo/components/TodoList";

const Home: NextPage = () => {
  return (
    <AuthGate redirectUrl="/account/sign-in">
      <main>
        <TodoList
          data={[
            { id: 5, label: "Mown the law" },
            { id: 6, label: "Do homework" },
          ]}
        />
        <SignUpForm handleSubmit={(values) => console.log({ values })} />
        <SignInForm handleSubmit={(values) => console.log({ values })} />
      </main>
    </AuthGate>
  );
};

export default Home;
