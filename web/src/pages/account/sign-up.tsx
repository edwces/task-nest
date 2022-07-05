import { NextPage } from "next";
import { useRouter } from "next/router";
import { PageMetadata } from "../../common/components/PageMetadata";
import { SignUpForm } from "../../modules/auth/components/SignUpForm";
import { useSignUpMutation } from "../../modules/auth/hooks/useSignUpMutation";

const SignUp: NextPage = () => {
  const signUp = useSignUpMutation();
  const router = useRouter();

  return (
    <>
      <PageMetadata title="Sign up" />
      <main>
        <SignUpForm
          handleSubmit={(values) =>
            signUp.mutate(values, {
              onSuccess: () => router.push("/account/sign-in"),
            })
          }
          isSubmitting={signUp.isLoading}
        />
      </main>
    </>
  );
};

export default SignUp;
