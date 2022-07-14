import { useMutation, useQueryClient } from "react-query";
import { CreateTagDTO } from "../dto/create-tag.dto";
import { createTag } from "../services/tag.service";

export function useTagCreateMutation() {
  const queryClient = useQueryClient();
  return useMutation((dto: CreateTagDTO) => createTag(dto), {
    onSuccess: () => {
      queryClient.invalidateQueries(["me", "tags"]);
    },
  });
}
