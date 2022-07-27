import { PageMetadata } from "../../common/components/PageMetadata";
import { NextPageWithLayout } from "../../common/interfaces/next-page-with-layout.interface";
import { ChangePasswordStepper } from "../../modules/auth/components/change/ChangePasswordStepper";
import { AuthLayout } from "../../modules/auth/components/AuthLayout";

const ForgotPassword: NextPageWithLayout = () => {
  return (
    <>
      <PageMetadata title="Reset Password" />
      <ChangePasswordStepper />
    </>
  );
};

ForgotPassword.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default ForgotPassword;
