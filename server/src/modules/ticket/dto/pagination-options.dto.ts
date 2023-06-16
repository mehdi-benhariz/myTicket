export class PaginationOptionsDto {
  constructor(
    public limit: number,
    public page: number,
    public route: string,
  ) {}
}
