import { ObjectLiteral } from 'typeorm';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import { ListResponse } from '../interfaces/list-response.interface';
import { PaginationDTO } from '../dto/pagination.dto';
import getPageAndLimit from './get-page-and-limit.helper';

export const getWithPagination = async <
  Entity extends ObjectLiteral,
  ResultEntity extends Entity = Entity,
>(
  query: SelectQueryBuilder<Entity>,
  pagination: PaginationDTO,
  tableAlias?: string,
  virtualColumns: (keyof ResultEntity)[] = [],
): Promise<ListResponse<ResultEntity>> => {
  const { page, limit, offset: paginationOffset } = getPageAndLimit(pagination);
  const offset = paginationOffset + (page - 1) * limit;
  query.offset(offset).limit(limit);

  let items: ResultEntity[] = [];
  if (virtualColumns.length) {
    const { raw, entities } = await query.getRawAndEntities();

    items = entities.map((entity) => {
      const res: ResultEntity = entity as unknown as ResultEntity;
      const rawItem = raw.find(
        (item) => item[`${tableAlias}_id`] === entity.id,
      );

      for (const virtualColumn of virtualColumns) {
        const value = rawItem[virtualColumn];

        if (value !== undefined) {
          res[virtualColumn] = value;
        }
      }

      return res;
    });
  } else {
    items = (await query.getMany()) as ResultEntity[];
  }

  const totalCount = await query.getCount();
  const totalItems = Math.max(totalCount - paginationOffset, 0);
  return {
    items,
    pagination: {
      currentPage: page,
      itemCount: items.length,
      itemsPerPage: limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    },
  };
};
