import { useModals } from "@mantine/modals";
import { Text } from "@mantine/core";

interface ConfirmDeleteTodoModalProps {
  onConfirm: () => void;
}

export function useConfirmDeleteTodoModal() {
  const { openConfirmModal } = useModals();

  const open = ({ onConfirm }: ConfirmDeleteTodoModalProps) =>
    openConfirmModal({
      title: `Confirm your action`,
      children: (
        <Text mb={30} size="sm">
          Are you really sure you want to delete this todo
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm,
    });

  return { open };
}
