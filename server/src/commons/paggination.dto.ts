export class PaginationDto<T> {
  data: T[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}
