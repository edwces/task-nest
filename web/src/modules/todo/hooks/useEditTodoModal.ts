import { useModals } from "@mantine/modals";
import { Modal } from "../../../common/enums/modal.enum";
import { EditTodoModalProps } from "../components/edit/EditTodoModal";

export function useEditTodoModal() {
  const modal = useModals();

  const open = (innerProps: EditTodoModalProps) => {
    modal.openContextModal(Modal.EDIT_TODO, {
      innerProps,
      withCloseButton: false,
    });
  };

  return { open };
}
