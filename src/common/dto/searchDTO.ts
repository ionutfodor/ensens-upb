import { PaginationDTO } from "./paginationDTO";
import { SorterDTO } from "./sorterDTO";
import { FilterDTO } from "./filterDTO";
import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SearchDTO {
  @ApiProperty({
    example: 'lora.tts.smartparking.sp4',
    required: true
  })
  @IsString()
  measurement: string;

  @ApiProperty({
    type: [String],
    example: ["ack", "parking_slot_status"],
    required: false
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  projections?: string[];

  @ApiProperty({
    type: [FilterDTO],
    example: [
      {
        filterField: "ack",
        filterValue: "0",
        filterOperation: "EQ",
        operatorEnum: "OR",
      },
      {
        filterField: "parking_slot_status",
        filterValue: "1",
        filterOperation: "EQ",
        operatorEnum: "AND",
      },
      {
        filterField: "time",
        filterValue: "2024-03-19T20:43:20.418Z",
        filterOperation: "LT",
        operatorEnum: "AND",
      },
    ],
    required: false
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FilterDTO)
  @IsOptional()
  filters?: FilterDTO[];

  @ApiProperty({
    type: SorterDTO,
    example: { sortDirection: "DESC" },
    required: false
  })
  @ValidateNested()
  @Type(() => SorterDTO)
  @IsOptional()
  sorter?: SorterDTO;

  @ApiProperty({
    type: PaginationDTO,
    example: {
      all: false,
      offset: 100,
      limit: 20
    },
    required: false
  })
  @ValidateNested()
  @Type(() => PaginationDTO)
  @IsOptional()
  pagination?: PaginationDTO;

  constructor(init?: Partial<SearchDTO>) {
    Object.assign(this, init);
  }
}