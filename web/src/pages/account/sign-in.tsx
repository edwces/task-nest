import { Paper, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { PageMetadata } from "../../common/components/PageMetadata";
import { NextPageWithLayout } from "../../common/types/next-page-with-layout.interface";
import { SignInForm } from "../../modules/auth/components/SignInForm";
import { useSignInMutation } from "../../modules/auth/hooks/useSignInMutation";
import { AuthLayout } from "../../modules/layout/components/AuthLayout";

const SignIn: NextPageWithLayout = () => {
  const signIn = useSignInMutation();
  const router = useRouter();

  return (
    <>
      <PageMetadata title="Sign in" />
      <Title mb={30}>Sign In to your Account</Title>
      <Paper withBorder p={30}>
        <SignInForm
          handleSubmit={(values) =>
            signIn.mutate(values, { onSuccess: () => router.push("/") })
          }
          isSubmitting={signIn.isLoading}
        />
      </Paper>
    </>
  );
};

SignIn.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default SignIn;
