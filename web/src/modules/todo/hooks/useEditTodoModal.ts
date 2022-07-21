import { useModals } from "@mantine/modals";
import { Modal } from "../../../common/types/modal.enum";

export function useEditTodoModal() {
  const modal = useModals();

  const open = () => {
    modal.openContextModal(Modal.EDIT_TODO, {
      innerProps: {},
      withCloseButton: false,
    });
  };

  return { open };
}
