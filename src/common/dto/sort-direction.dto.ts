import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { SortDirectionParams } from '../entities/sort-direction-params.enum';

export class SortDirectionDTO {
  @ApiPropertyOptional({ enum: SortDirectionParams })
  @IsOptional()
  @IsEnum(SortDirectionParams)
  sortDirection?: SortDirectionParams;
}
