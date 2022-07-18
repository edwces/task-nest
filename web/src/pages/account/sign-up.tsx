import { Paper, Title, Text, Stack, Anchor } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useRouter } from "next/router";
import { PageMetadata } from "../../common/components/PageMetadata";
import { NextPageWithLayout } from "../../common/types/next-page-with-layout.interface";
import { SignUpForm } from "../../modules/auth/components/SignUpForm";
import { useSignUpMutation } from "../../modules/auth/hooks/useSignUpMutation";
import { AuthLayout } from "../../modules/layout/components/AuthLayout";

const SignUp: NextPageWithLayout = () => {
  const signUp = useSignUpMutation();
  const router = useRouter();

  return (
    <>
      <PageMetadata title="Sign up" />
      <Stack mb={30} spacing={7}>
        <Title>Sign up for an Account</Title>
        <Text size="sm" color="dimmed" align="center">
          Already have an account?{" "}
          <Anchor size="sm" component={NextLink} href="/account/sign-in">
            Sign in here
          </Anchor>
        </Text>
      </Stack>
      <Paper withBorder p={30}>
        <SignUpForm
          handleSubmit={(values) =>
            signUp.mutate(values, {
              onSuccess: () => router.push("/account/sign-in"),
            })
          }
          isSubmitting={signUp.isLoading}
        />
      </Paper>
    </>
  );
};

SignUp.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default SignUp;
