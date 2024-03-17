import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { SortByFields } from '../enums/sort-by-fields.enum';
import { SortDirectionDTO } from '../../../common/dto/sort-direction.dto';
import { DroneTypes } from '../enums/drone-types.enum';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDTO } from '../../../common/dto/pagination.dto';

export class GetDronesDTO extends IntersectionType(
  SortDirectionDTO,
  PaginationDTO,
) {
  @ApiPropertyOptional({ enum: SortByFields })
  @IsOptional()
  @IsEnum(SortByFields)
  sortBy?: SortByFields;

  @ApiPropertyOptional({ enum: DroneTypes })
  @IsOptional()
  @IsEnum(DroneTypes)
  type?: DroneTypes;
}
