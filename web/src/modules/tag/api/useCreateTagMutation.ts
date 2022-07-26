import { useMutation, useQueryClient } from "react-query";
import { http } from "../../../config/httpClient";
import { CreateTagDTO } from "../dto/create-tag.dto";

function createTag(data: CreateTagDTO) {
  return http.post<void>("me/tags", data);
}

export function useCreateTagMutation() {
  const queryClient = useQueryClient();
  return useMutation((data: CreateTagDTO) => createTag(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["me", "tags"]);
    },
  });
}
