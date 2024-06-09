import { SortDirection } from "../enum/sort-direction";
import { IsDefined, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SorterDTO {
  @ApiProperty({
    example: 'DESC',
    enum: SortDirection,
    required: true
  })
  @IsEnum(SortDirection)
  @IsDefined()
  sortDirection: SortDirection;

  constructor(init?: Partial<SorterDTO>) {
    Object.assign(this, init);
  }
}