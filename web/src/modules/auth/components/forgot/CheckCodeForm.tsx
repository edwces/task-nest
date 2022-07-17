import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { z } from "zod";

const checkCodeSchema = z.object({
  code: z.string().length(8),
});

export type CheckCodeFieldsDTO = z.infer<typeof checkCodeSchema>;

interface CheckCodeFormProps {
  handleSubmit: (values: CheckCodeFieldsDTO) => void;
  initialValues?: CheckCodeFieldsDTO;
  isSubmitting?: boolean;
}

export function CheckCodeForm({
  handleSubmit,
  initialValues = { code: "" },
  isSubmitting = false,
}: CheckCodeFormProps) {
  const form = useForm({ initialValues });

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput required label="Code" {...form.getInputProps("code")} />
      <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
        Validate Reset Code
      </Button>
    </form>
  );
}
