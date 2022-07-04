import { NextPage } from "next";
import { PageMetadata } from "../../common/components/PageMetadata";
import { SignInForm } from "../../modules/auth/components/SignInForm";

const SignIn: NextPage = () => {
  return (
    <>
      <PageMetadata title="Sign in" />
      <main>
        <SignInForm handleSubmit={(values) => console.log(values)} />
      </main>
    </>
  );
};

export default SignIn;
