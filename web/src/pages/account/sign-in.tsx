import { NextPage } from "next";
import { SignInForm } from "../../modules/auth/components/SignInForm";

const SignIn: NextPage = () => {
  return (
    <main>
      <SignInForm handleSubmit={(values) => console.log(values)} />
    </main>
  );
};

export default SignIn;
