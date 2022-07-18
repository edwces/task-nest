import { Paper, Stack, Title, Text, Anchor, Container } from "@mantine/core";
import { NextLink } from "@mantine/next";
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
    <Container size={460} sx={{ width: "100%" }}>
      <PageMetadata title="Sign in" />
      <Stack mb={30} spacing={7}>
        <Title align="center">Sign in for access</Title>
        <Text size="sm" color="dimmed" align="center">
          Don&apos;t have an account yet?{" "}
          <Anchor size="sm" component={NextLink} href="/account/sign-up">
            Sign up here
          </Anchor>
        </Text>
      </Stack>
      <Paper withBorder p={30}>
        <SignInForm
          handleSubmit={(values) =>
            signIn.mutate(values, { onSuccess: () => router.push("/") })
          }
          isSubmitting={signIn.isLoading}
        />
      </Paper>
    </Container>
  );
};

SignIn.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default SignIn;
