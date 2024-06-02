import { SortDirection } from "../enum/sort-direction";
import { IsDefined, IsEnum } from "class-validator";

export class SorterDTO {
  @IsEnum(SortDirection)
  @IsDefined()
  sortDirection?: SortDirection;

  constructor(init?: Partial<SorterDTO>) {
    Object.assign(this, init);
  }
}