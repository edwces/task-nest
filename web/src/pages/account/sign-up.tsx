import { NextPage } from "next";
import { SignUpForm } from "../../modules/auth/components/SignUpForm";

const SignUp: NextPage = () => {
  return (
    <main>
      <SignUpForm handleSubmit={(values) => console.log(values)} />
    </main>
  );
};

export default SignUp;
