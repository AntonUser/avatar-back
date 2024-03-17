import { ApiProperty } from '@nestjs/swagger';
import { IPaginationMeta } from '../interfaces/list-response.interface';

export class PaginationMetaRTO implements IPaginationMeta {
  @ApiProperty({ description: 'Всего элементов' })
  totalItems: number;
  @ApiProperty({ description: 'Всего страниц' })
  totalPages: number;
  @ApiProperty({ description: 'Кол-во элементов на текущей странице' })
  itemCount: number;
  @ApiProperty({ description: 'Кол-во элементов на странице (limit)' })
  itemsPerPage: number;
  @ApiProperty({ description: 'Номер текущей страницы' })
  currentPage: number;
}

export abstract class ListResponseRTO<T> {
  @ApiProperty({ type: () => PaginationMetaRTO })
  pagination: PaginationMetaRTO;

  abstract items: T[];
}
