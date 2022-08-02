import { useModals } from "@mantine/modals";
import { Text } from "@mantine/core";

interface ConfirmDeleteTagModalProps {
  onConfirm: () => void;
  label: string;
}

export function useConfirmDeleteTagModal() {
  const { openConfirmModal } = useModals();

  const open = ({ onConfirm, label }: ConfirmDeleteTagModalProps) =>
    openConfirmModal({
      title: `Confirm your action`,
      children: (
        <Text mb={30} size="sm">
          Are you really sure you want to delete tag{" "}
          <Text component="span" size="sm" weight={700}>
            {label}
          </Text>
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm,
    });

  return { open };
}
