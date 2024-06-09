import { IsBoolean, IsDefined, IsInt, IsOptional, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class PaginationDTO {
  @ApiProperty({
    example: '100',
    required: false
  })
  @IsInt()
  @IsOptional()
  @Min(0)
  offset?: number;

  @ApiProperty({
    example: '20',
    required: false
  })
  @IsInt()
  @IsOptional()
  @Min(1)
  limit?: number;

  @ApiProperty({
    example: false,
    required: true
  })
  @IsBoolean()
  @IsDefined()
  all: boolean;

  constructor(init?: Partial<PaginationDTO>) {
    Object.assign(this, init);
  }
}