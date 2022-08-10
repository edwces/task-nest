import { useMutation, useQueryClient } from "react-query";
import { http } from "../../../config/httpClient";

function deleteTag(label: string) {
  return http.delete<void>(`me/tags/${label}`);
}

export function useDeleteTagMutation() {
  const queryClient = useQueryClient();
  return useMutation((label: string) => deleteTag(label), {
    onSuccess: () => {
      queryClient.invalidateQueries(["me", "tags"]);
      queryClient.refetchQueries(["me", "todos"]);
    },
  });
}
