import { Basic } from "../../../common/models/basic.model";
import { Repeat } from "../../dates/enums/repeat.enum";
import { Tag } from "../../tag/models/tag.model";

export interface Todo extends Basic {
  id: number;
  label: string;
  tags: Tag[];
  description: string;
  expiresAt: string | null;
  isExpired: boolean;
  isBookmarked: boolean;
  isChecked: boolean;
  checkedAt: string | null;
  repeat: Repeat;
}
