import { IBaseEntity } from '../../../common/interfaces/base-entity.interface';

export interface IUsers extends IBaseEntity {
  name?: string;
  phoneNumber?: string;
  email: string;
  password: string;
}
