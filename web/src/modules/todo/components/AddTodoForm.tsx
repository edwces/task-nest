import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { AddTodoDTO } from "../dto/add-todo.dto";

interface AddTodoFormProps {
  handleSubmit: (values: AddTodoDTO) => void;
  initialValues?: AddTodoDTO;
  isSubmitting?: boolean;
}

export function AddTodoForm({
  handleSubmit,
  initialValues = { label: "" },
  isSubmitting = false,
}: AddTodoFormProps) {
  const form = useForm<AddTodoDTO>({ initialValues });

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput required {...form.getInputProps("label")} />
      <Button type="submit" disabled={isSubmitting} loading={isSubmitting} />
    </form>
  );
}
