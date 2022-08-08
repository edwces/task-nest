import { Basic } from "../../../common/models/basic.model";
import { Tag } from "../../tag/models/tag.model";

export interface Todo extends Basic {
  id: number;
  label: string;
  tags: Tag[];
  description: string;
  expiresAt: string;
  isExpired: boolean;
  isBookmarked: boolean;
}
