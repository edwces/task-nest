import { Basic } from "../../../common/models/basic.model";

export interface User extends Basic {
  id: number;
  name: string;
  email: string;
}
