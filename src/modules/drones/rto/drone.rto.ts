import { IDrone } from '../interfaces/drone.interface';
import { DroneTypes } from '../enums/drone-types.enum';
import { BaseEntity } from '../../../common/entities/base.entity';
import { IFile } from '../../files/interfaces/file.interface';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FileRTO } from '../../files/rto/file.rto';
import { CommonResponseRTO } from '../../../common/rto/common-response.rto';
import { ListResponseRTO } from '../../../common/rto/list-response.rto';

export class DroneRTO extends BaseEntity implements IDrone {
  @ApiProperty()
  description: string | null;

  @ApiProperty({ type: FileRTO })
  image: IFile | null;

  @ApiProperty()
  imageId: string | null;

  @ApiProperty()
  type: DroneTypes;

  @ApiPropertyOptional({ example: '89.207.132.170' })
  cameraIp?: string;

  @ApiPropertyOptional()
  cameraLogin?: string;

  @ApiPropertyOptional()
  cameraPassword?: string;
}

export class OneDroneRTO extends CommonResponseRTO<DroneRTO> {
  @ApiProperty({ type: DroneRTO })
  data: DroneRTO;
}

class DronesList extends ListResponseRTO<DroneRTO> {
  @ApiProperty({ type: () => [DroneRTO] })
  items: DroneRTO[];
}

export class ListArticleRTO extends CommonResponseRTO<DronesList> {
  @ApiProperty({ type: () => DronesList })
  data: DronesList;
}
