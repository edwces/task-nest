import { NextPage } from "next";
import { PageMetadata } from "../../common/components/PageMetadata";
import { SignUpForm } from "../../modules/auth/components/SignUpForm";

const SignUp: NextPage = () => {
  return (
    <>
      <PageMetadata title="Sign up" />
      <main>
        <SignUpForm handleSubmit={(values) => console.log(values)} />
      </main>
    </>
  );
};

export default SignUp;
