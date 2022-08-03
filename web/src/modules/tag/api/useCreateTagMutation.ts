import { useMutation, useQueryClient } from "react-query";
import { http } from "../../../config/httpClient";
import { CreateTagDTO } from "../dto/create-tag.dto";
import { Tag } from "../models/tag.model";

function createTag(data: CreateTagDTO) {
  return http.post<Tag>("me/tags", data).then((response) => response.data);
}

export function useCreateTagMutation() {
  const queryClient = useQueryClient();
  return useMutation((data: CreateTagDTO) => createTag(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["me", "tags"]);
    },
  });
}
