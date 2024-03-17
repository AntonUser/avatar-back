import { PartialType } from '@nestjs/swagger';
import { CreateDroneDTO } from './create-drone.dto';

export class UpdateDroneDTO extends PartialType(CreateDroneDTO) {}
