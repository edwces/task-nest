import { http } from "../../../config/httpClient";
import { CreateTagDTO } from "../dto/create-tag.dto";
import { Tag } from "../models/tag.model";

export function getTags(): Promise<Tag[]> {
  return http.get("me/tags").then((response) => response.data);
}

export function createTag(dto: CreateTagDTO): Promise<void> {
  return http.post("me/tags", dto);
}
