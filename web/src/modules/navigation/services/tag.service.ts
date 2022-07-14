import { http } from "../../../config/httpClient";

export function getTags() {
  return http.get("me/tags").then((response) => response.data);
}
