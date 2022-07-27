import { Alert, Center, Paper, Stepper, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";
import { Mail } from "tabler-icons-react";
import { useValidateResetCodeMutation } from "../../api/useValidateResetCodeMutation";
import { useCreateResetCodeMutation } from "../../api/useCreateResetCodeMutation";
import { ValidateCodeFieldsDTO, ValidateCodeForm } from "./ValidateCodeForm";
import { CreateCodeForm } from "./CreateCodeForm";
import { ResetPasswordFieldsDTO, ResetPasswordForm } from "./ResetPasswordForm";
import { useChangePasswordMutation } from "../../api/useChangePasswordMutation";
import { ChangePasswordDTO } from "../../dto/change-password.dto";
import { CreateResetCodeDTO } from "../../dto/create-reset-code.dto";
import { Route } from "../../../../common/enums/route.enum";

export function ResetPasswordStepper() {
  const [active, setActive] = useState(0);
  const [savedFields, setSavedFields] = useState<ChangePasswordDTO>({
    email: "",
    code: "",
    password: "",
  });
  const createResetCode = useCreateResetCodeMutation();
  const validateResetCode = useValidateResetCodeMutation();
  const resetPassword = useChangePasswordMutation();
  const router = useRouter();

  const nextStep = () => setActive(active + 1);

  const handleCreateCode = (values: CreateResetCodeDTO) => {
    createResetCode.mutate(values, {
      onSuccess: () => {
        setSavedFields({ ...savedFields, email: values.email });
        nextStep();
      },
    });
  };

  const handleValidateCode = (values: ValidateCodeFieldsDTO) => {
    const { email } = savedFields;
    validateResetCode.mutate(
      { email, ...values },
      {
        onSuccess: () => {
          setSavedFields({ ...savedFields, code: values.code });
          nextStep();
        },
      }
    );
  };

  const handleResetPassword = (values: ResetPasswordFieldsDTO) => {
    const { email, code } = savedFields;
    resetPassword.mutate(
      { email, code, ...values },
      {
        onSuccess: () => {
          router.push(Route.SIGN_IN);
        },
      }
    );
  };

  return (
    <Stepper active={active}>
      <Stepper.Step label="Create Code" mb={50}>
        <Center>
          <Paper withBorder p={30} sx={{ width: 400 }}>
            <Text mb={20} size="sm" color="dimmed">
              Enter Email Address associated with your account and we&apos;ll
              send you an Reset code to your address
            </Text>
            <CreateCodeForm
              handleSubmit={handleCreateCode}
              isSubmitting={createResetCode.isLoading}
            />
          </Paper>
        </Center>
      </Stepper.Step>
      <Stepper.Step label="Validate Code" mb={50}>
        <Paper withBorder p={30}>
          <Alert
            color="violet"
            variant="outline"
            title="Validate your code!"
            mb={40}
            icon={<Mail size={22} />}
          >{`Enter code that was sent to your email: ${savedFields.email}`}</Alert>
          <ValidateCodeForm
            handleSubmit={handleValidateCode}
            isSubmitting={validateResetCode.isLoading}
            onResendCode={() =>
              createResetCode.mutate({ email: savedFields.email })
            }
          />
        </Paper>
      </Stepper.Step>
      <Stepper.Step label="Reset Password" mb={50}>
        <Paper withBorder p={30}>
          <Text mb={20} size="sm" color="dimmed">
            This is going to be a new password that will be used from now on
          </Text>
          <ResetPasswordForm
            handleSubmit={handleResetPassword}
            isSubmitting={resetPassword.isLoading}
          />
        </Paper>
      </Stepper.Step>
    </Stepper>
  );
}
