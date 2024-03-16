import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class RemoveFilesDTO {
  @ApiProperty({ type: [String] })
  @IsString({ each: true })
  @IsNotEmpty()
  @IsArray()
  names: string[];
}
