import { IsBoolean, IsDefined, IsInt, IsOptional, Min } from "class-validator";

export class PaginationDTO {
  @IsInt()
  @IsOptional()
  @Min(0)
  offset?: number;

  @IsInt()
  @IsOptional()
  @Min(1)
  limit?: number;

  @IsBoolean()
  @IsDefined()
  all?: boolean;

  constructor(init?: Partial<PaginationDTO>) {
    Object.assign(this, init);
  }
}