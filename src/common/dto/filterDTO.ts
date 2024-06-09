import { FilterOperation } from "../enum/filter-operation";
import { OperatorEnum } from "../enum/operator-enum";
import { IsDefined, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class FilterDTO {
  @ApiProperty({
    example: 'ack',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  filterField: string;

  @ApiProperty({
    example: '0',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  filterValue: string;

  @ApiProperty({
    example: 'EQ',
    enum: FilterOperation,
    required: true
  })
  @IsEnum(FilterOperation)
  @IsDefined()
  filterOperation: FilterOperation;

  @ApiProperty({
    example: 'AND',
    enum: OperatorEnum,
    required: true
  })
  @IsEnum(OperatorEnum)
  @IsDefined()
  operatorEnum: OperatorEnum;

  constructor(init?: Partial<FilterDTO>) {
    Object.assign(this, init);
  }
}