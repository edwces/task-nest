import { NextPage } from "next";
import { useRouter } from "next/router";
import { PageMetadata } from "../../common/components/PageMetadata";
import { SignInForm } from "../../modules/auth/components/SignInForm";
import { useSignInMutation } from "../../modules/auth/hooks/useSignInMutation";

const SignIn: NextPage = () => {
  const signIn = useSignInMutation();
  const router = useRouter();

  return (
    <>
      <PageMetadata title="Sign in" />
      <main>
        <SignInForm
          handleSubmit={(values) =>
            signIn.mutate(values, { onSuccess: () => router.push("/") })
          }
          isSubmitting={signIn.isLoading}
        />
      </main>
    </>
  );
};

export default SignIn;
