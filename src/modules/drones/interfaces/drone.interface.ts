import { IBaseEntity } from '../../../common/interfaces/base-entity.interface';
import { DroneTypes } from '../enums/drone-types.enum';
import { IFile } from '../../files/interfaces/file.interface';

export interface IDrone extends IBaseEntity {
  type: DroneTypes;
  description: string | null;
  image: IFile | null;
  imageId: string | null;
}
