import { useQuery } from "react-query";
import { getTags } from "../services/tag.service";

export function useTags() {
  return useQuery(["me", "tags"], getTags);
}
