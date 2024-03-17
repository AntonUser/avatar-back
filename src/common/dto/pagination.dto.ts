import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDTO {
  @ApiPropertyOptional()
  @Transform(({ value }) => Number(value))
  @IsPositive()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({
    description:
      'Кол-во элементов на странице. Если 0, то выведутся все элементы',
  })
  @Transform(({ value }) => Number(value))
  @Min(0)
  @IsInt()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({
    description:
      'Отступ от начала. Даже при ненулевом значении можно и нужно начинать запрашивать список с 1 страницы',
  })
  @Transform(({ value }) => Number(value))
  @Min(0)
  @IsInt()
  @IsOptional()
  offset?: number;
}
