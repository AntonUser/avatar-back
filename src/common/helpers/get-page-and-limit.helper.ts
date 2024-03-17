import { PaginationDTO } from '../dto/pagination.dto';

export const getPageAndLimit = ({
  page,
  limit,
  offset,
}: PaginationDTO): { page: number; limit: number; offset: number } => {
  const res = { page: 1, limit: 15, offset: 0 };
  if (page) {
    res.page = page;
  }
  if (limit || limit === 0) {
    res.limit = limit;
  }
  if (offset) {
    res.offset = offset;
  }

  return res;
};
export default getPageAndLimit;
