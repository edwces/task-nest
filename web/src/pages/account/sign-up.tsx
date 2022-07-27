import { Paper, Title, Text, Stack, Anchor, Container } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useRouter } from "next/router";
import { PageMetadata } from "../../common/components/PageMetadata";
import { NextPageWithLayout } from "../../common/interfaces/next-page-with-layout.interface";
import { SignUpForm } from "../../modules/auth/components/account/SignUpForm";
import { useSignUpMutation } from "../../modules/auth/api/useSignUpMutation";
import { AuthLayout } from "../../modules/auth/components/AuthLayout";
import { SignUpDTO } from "../../modules/auth/dto/sign-up.dto";
import { Route } from "../../common/enums/route.enum";

const SignUp: NextPageWithLayout = () => {
  const signUp = useSignUpMutation();
  const router = useRouter();

  const handleSignUp = (values: SignUpDTO) =>
    signUp.mutate(values, { onSuccess: () => router.push(Route.SIGN_IN) });

  return (
    <Container size={460} sx={{ width: "100%" }}>
      <PageMetadata title="Sign up" />
      <Stack mb={30} spacing={7}>
        <Title align="center">Sign up for an Account</Title>
        <Text size="sm" color="dimmed" align="center">
          Already have an account?{" "}
          <Anchor size="sm" component={NextLink} href={Route.SIGN_IN}>
            Sign in here
          </Anchor>
        </Text>
      </Stack>
      <Paper withBorder p={30}>
        <SignUpForm onSignUp={handleSignUp} isSubmitting={signUp.isLoading} />
      </Paper>
    </Container>
  );
};

SignUp.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default SignUp;
