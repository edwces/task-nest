import { useQuery } from "react-query";
import { http } from "../../../config/httpClient";
import { Tag } from "../models/tag.model";

function getTags() {
  return http.get<Tag[]>("me/tags").then((response) => response.data);
}

export function useTags() {
  return useQuery(["me", "tags"], getTags);
}
