import {
  Checkbox,
  Group,
  MantineSize,
  TextInput,
  TextInputProps,
} from "@mantine/core";

type CheckboxTextInput = TextInputProps & { checkboxSize?: MantineSize };

export function CheckboxTextInput({
  checkboxSize = "xl",
  ...props
}: CheckboxTextInput) {
  return (
    <Group>
      <Checkbox readOnly checked={false} radius="xl" size={checkboxSize} />
      <TextInput
        variant="unstyled"
        placeholder="Add Todo"
        size="lg"
        autoComplete="off"
        {...props}
      />
    </Group>
  );
}
