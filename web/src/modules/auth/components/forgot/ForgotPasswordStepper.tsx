import { Alert, Button, Paper, Stepper } from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";
import { InfoCircle } from "tabler-icons-react";
import { ResetPasswordDTO } from "../../dto/reset-password.dto";
import { useCheckResetCodeMutation } from "../../hooks/useCheckResetCodeMutation";
import { useCreateResetCodeMutation } from "../../hooks/useCreateResetCodeMutation";
import { useResetPasswordMutation } from "../../hooks/useResetPasswordMutation";
import { CheckCodeForm } from "./CheckCodeForm";
import { CreateCodeForm } from "./CreateCodeForm";
import { ResetPasswordForm } from "./ResetPasswordForm";

export function ForgotPasswordStepper() {
  const [active, setActive] = useState(0);
  const [resetCredentials, setResetCredentials] = useState<ResetPasswordDTO>({
    email: "",
    code: "",
    password: "",
  });
  const createResetCode = useCreateResetCodeMutation();
  const checkResetCode = useCheckResetCodeMutation();
  const resetPassword = useResetPasswordMutation();
  const router = useRouter();

  const nextStep = () => setActive(active + 1);

  return (
    <Stepper active={active}>
      <Stepper.Step label="Create Code">
        <Paper withBorder p={20}>
          <CreateCodeForm
            handleSubmit={(values) =>
              createResetCode.mutate(values, {
                onSuccess: () => {
                  nextStep();
                  setResetCredentials({
                    ...resetCredentials,
                    email: values.email,
                  });
                },
              })
            }
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
          >{`Reset Code was sent to your email at ${resetCredentials.email}`}</Alert>
          <CheckCodeForm
            handleSubmit={(values) =>
              checkResetCode.mutate(
                { email: resetCredentials.email, ...values },
                {
                  onSuccess: () => {
                    nextStep();
                    setResetCredentials({
                      ...resetCredentials,
                      code: values.code,
                    });
                  },
                }
              )
            }
            isSubmitting={checkResetCode.isLoading}
          />
          <Button
            compact
            variant="subtle"
            onClick={() =>
              createResetCode.mutate({ email: resetCredentials.email })
            }
          >
            Resend Password
          </Button>
        </Paper>
      </Stepper.Step>
      <Stepper.Step label="Reset Password">
        <ResetPasswordForm
          handleSubmit={(values) =>
            resetPassword.mutate(
              {
                email: resetCredentials.email,
                code: resetCredentials.code,
                password: values.password,
              },
              { onSuccess: () => router.push("/account/sign-in") }
            )
          }
          isSubmitting={resetPassword.isLoading}
        />
      </Stepper.Step>
    </Stepper>
  );
}
