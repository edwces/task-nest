import { CheckCodeFieldsDTO } from "../components/forgot/CheckCodeForm";

export interface CheckCodeDTO extends CheckCodeFieldsDTO {
  email: string;
}
