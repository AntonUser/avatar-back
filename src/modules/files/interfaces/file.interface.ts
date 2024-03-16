import { IBaseEntity } from '../../../common/interfaces/base-entity.interface';

export interface IFile extends IBaseEntity {
  mimetype: string;
  size: number;
}
