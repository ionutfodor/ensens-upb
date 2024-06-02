import { FilterOperation } from "../enum/filter-operation";
import { OperatorEnum } from "../enum/operator-enum";
import { IsDefined, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class FilterDTO {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  filterField?: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  filterValue?: string;

  @IsEnum(FilterOperation)
  @IsDefined()
  filterOperation?: FilterOperation;

  @IsEnum(OperatorEnum)
  @IsDefined()
  operatorEnum: OperatorEnum;

  constructor(init?: Partial<FilterDTO>) {
    Object.assign(this, init);
  }
}