import { Button, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { z } from "zod";

const validateCodeSchema = z.object({
  code: z.string().length(8),
});

export type ValidateCodeFieldsDTO = z.infer<typeof validateCodeSchema>;

interface ValidateCodeFormProps {
  handleSubmit: (values: ValidateCodeFieldsDTO) => void;
  initialValues?: ValidateCodeFieldsDTO;
  isSubmitting?: boolean;
}

export function ValidateCodeForm({
  handleSubmit,
  initialValues = { code: "" },
  isSubmitting = false,
}: ValidateCodeFormProps) {
  const form = useForm({ initialValues });

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack spacing={25}>
        <TextInput required label="Code" {...form.getInputProps("code")} />
        <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
          Validate Reset Code
        </Button>
      </Stack>
    </form>
  );
}
