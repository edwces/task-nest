import { ActionIcon, Group } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { X } from "tabler-icons-react";
import { EditTodoForm } from "./EditTodoForm";

export function EditTodoModal({ context, id, innerProps }: ContextModalProps) {
  return (
    <Group align="start" sx={{ justifyContent: "space-around" }}>
      <EditTodoForm
        initialValues={{ label: "welcome", description: "fdfdfdf" }}
      />
      <ActionIcon onClick={() => context.closeModal(id)}>
        <X size={22} />
      </ActionIcon>
    </Group>
  );
}
