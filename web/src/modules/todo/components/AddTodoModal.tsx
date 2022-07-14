import { ContextModalProps } from "@mantine/modals";
import { useTagCreateMutation } from "../../navigation/hooks/useTagCreateMutation";
import { useTags } from "../../navigation/hooks/useTags";
import { Tag } from "../../navigation/models/tag.model";
import { useAddTodoMutation } from "../hooks/useAddTodoMutation";
import { AddTodoForm } from "./AddTodoForm";

export function AddTodoModal({ context, id, innerProps }: ContextModalProps) {
  const createTodo = useAddTodoMutation();
  const createTag = useTagCreateMutation();
  const { data } = useTags();

  const tagsToChoices = (data: Tag[]) => {
    return data.map((tag) => ({ value: tag.id.toString(), label: tag.label }));
  };

  return (
    <>
      {data && (
        <AddTodoForm
          handleSubmit={(values) =>
            createTodo.mutate(values, {
              onSuccess: () => context.closeModal(id),
            })
          }
          isSubmitting={createTodo.isLoading}
          tagsChoices={tagsToChoices(data)}
          onTagCreate={(query) => createTag.mutate({ label: query })}
        />
      )}
    </>
  );
}
