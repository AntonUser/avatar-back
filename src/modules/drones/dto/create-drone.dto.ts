import { DroneTypes } from '../enums/drone-types.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDroneDTO {
  @ApiProperty({ enum: DroneTypes })
  @IsEnum(DroneTypes)
  @IsNotEmpty()
  type: DroneTypes;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  imageId?: string;
}
