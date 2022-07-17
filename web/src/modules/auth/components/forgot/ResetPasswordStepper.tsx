import { Alert, Button, Paper, Stepper } from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";
import { InfoCircle } from "tabler-icons-react";
import { ResetPasswordDTO } from "../../dto/reset-password.dto";
import { useValidateResetCodeMutation } from "../../hooks/useValidateResetCodeMutation";
import { useCreateResetCodeMutation } from "../../hooks/useCreateResetCodeMutation";
import { useResetPasswordMutation } from "../../hooks/useResetPasswordMutation";
import { ValidateCodeFieldsDTO, ValidateCodeForm } from "./ValidateCodeForm";
import { CreateCodeFieldsDTO, CreateCodeForm } from "./CreateCodeForm";
import { ResetPasswordFieldsDTO, ResetPasswordForm } from "./ResetPasswordForm";

export function ResetPasswordStepper() {
  const [active, setActive] = useState(0);
  const [savedFields, setSavedFields] = useState<ResetPasswordDTO>({
    email: "",
    code: "",
    password: "",
  });
  const createResetCode = useCreateResetCodeMutation();
  const validateResetCode = useValidateResetCodeMutation();
  const resetPassword = useResetPasswordMutation();
  const router = useRouter();

  const nextStep = () => setActive(active + 1);

  const handleCreateCode = (values: CreateCodeFieldsDTO) => {
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
          router.push("/account/sign-in");
        },
      }
    );
  };

  return (
    <Stepper active={active} mb={30}>
      <Stepper.Step label="Create Code">
        <Paper withBorder p={20}>
          <CreateCodeForm
            handleSubmit={handleCreateCode}
            isSubmitting={createResetCode.isLoading}
          />
        </Paper>
      </Stepper.Step>
      <Stepper.Step label="Validate Code">
        <Paper withBorder p={20}>
          <Alert
            icon={<InfoCircle size={16} />}
            title="Code sent"
            color="green"
          >{`Reset Code was sent to your email at ${savedFields.email}`}</Alert>
          <ValidateCodeForm
            handleSubmit={handleValidateCode}
            isSubmitting={validateResetCode.isLoading}
          />
          <Button
            compact
            variant="subtle"
            onClick={() => createResetCode.mutate({ email: savedFields.email })}
          >
            Resend Password
          </Button>
        </Paper>
      </Stepper.Step>
      <Stepper.Step label="Reset Password">
        <ResetPasswordForm
          handleSubmit={handleResetPassword}
          isSubmitting={resetPassword.isLoading}
        />
      </Stepper.Step>
    </Stepper>
  );
}
