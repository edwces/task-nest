import { Paper, Stack, Title, Text, Anchor, Container } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useRouter } from "next/router";
import { PageMetadata } from "../../common/components/PageMetadata";
import { NextPageWithLayout } from "../../common/interfaces/next-page-with-layout.interface";
import { SignInForm } from "../../modules/auth/components/account/SignInForm";
import { useSignInMutation } from "../../modules/auth/api/useSignInMutation";
import { AuthLayout } from "../../modules/auth/components/AuthLayout";
import { SignInDTO } from "../../modules/auth/dto/sign-in.dto";
import { Route } from "../../common/enums/route.enum";

const SignIn: NextPageWithLayout = () => {
  const signIn = useSignInMutation();
  const router = useRouter();

  const handleSignIn = (values: SignInDTO) =>
    signIn.mutate(values, { onSuccess: () => router.push("/") });

  return (
    <Container size={460} sx={{ width: "100%" }}>
      <PageMetadata title="Sign in" />
      <Stack mb={30} spacing={7}>
        <Title align="center">Sign in for access</Title>
        <Text size="sm" color="dimmed" align="center">
          Don&apos;t have an account yet?{" "}
          <Anchor size="sm" component={NextLink} href={Route.SIGN_UP}>
            Sign up here
          </Anchor>
        </Text>
      </Stack>
      <Paper withBorder p={30}>
        <SignInForm onSignIn={handleSignIn} isSubmitting={signIn.isLoading} />
      </Paper>
    </Container>
  );
};

SignIn.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default SignIn;
