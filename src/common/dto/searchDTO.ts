import { PaginationDTO } from "./paginationDTO";
import { SorterDTO } from "./sorterDTO";
import { FilterDTO } from "./filterDTO";
import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";

export class SearchDTO {
  @IsString()
  @IsOptional()
  measurement?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  projections?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FilterDTO)
  @IsOptional()
  filters?: FilterDTO[];

  @ValidateNested()
  @Type(() => SorterDTO)
  @IsOptional()
  sorter?: SorterDTO;

  @ValidateNested()
  @Type(() => PaginationDTO)
  @IsOptional()
  pagination?: PaginationDTO;

  constructor(init?: Partial<SearchDTO>) {
    Object.assign(this, init);
  }
}