import { useModals } from "@mantine/modals";
import { Modal } from "../../../common/types/modal.enum";

export function useAddTodoModal() {
  const modal = useModals();

  const open = () => {
    modal.openContextModal(Modal.ADD_TODO, {
      title: "Add Todo",
      innerProps: {},
    });
  };

  return { open };
}
