import { useModals } from "@mantine/modals";
import { Modal } from "../../../common/types/modal.enum";

type EditModalProps = { todoId: number };

export function useEditTodoModal() {
  const modal = useModals();

  const open = (innerProps: EditModalProps) => {
    modal.openContextModal(Modal.EDIT_TODO, {
      innerProps,
      withCloseButton: false,
    });
  };

  return { open };
}
