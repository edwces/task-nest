import { Title } from "@mantine/core";
import { PageMetadata } from "../../common/components/PageMetadata";
import { NextPageWithLayout } from "../../common/types/next-page-with-layout.interface";
import { ForgotPasswordStepper } from "../../modules/auth/components/forgot/ForgotPasswordStepper";
import { AuthLayout } from "../../modules/layout/components/AuthLayout";

const ForgotPassword: NextPageWithLayout = () => {
  return (
    <>
      <PageMetadata title="Reset Password" />
      <Title mb={30} align="center">
        Reset Password
      </Title>
      <ForgotPasswordStepper />
    </>
  );
};

ForgotPassword.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default ForgotPassword;
