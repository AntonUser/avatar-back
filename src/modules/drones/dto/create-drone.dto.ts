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

  @ApiPropertyOptional({ example: '89.207.132.170' })
  @IsOptional()
  @IsString()
  cameraIp?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cameraLogin?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cameraPassword?: string;

  @ApiPropertyOptional({ example: '89.207.132.170' })
  @IsOptional()
  @IsString()
  droneIp?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  droneToken?: string;
}
