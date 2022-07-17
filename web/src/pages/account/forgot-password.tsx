import { Title } from "@mantine/core";
import { PageMetadata } from "../../common/components/PageMetadata";
import { NextPageWithLayout } from "../../common/types/next-page-with-layout.interface";
import { ResetPasswordStepper } from "../../modules/auth/components/forgot/ResetPasswordStepper";
import { AuthLayout } from "../../modules/layout/components/AuthLayout";

const ForgotPassword: NextPageWithLayout = () => {
  return (
    <>
      <PageMetadata title="Reset Password" />
      <ResetPasswordStepper />
    </>
  );
};

ForgotPassword.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default ForgotPassword;
