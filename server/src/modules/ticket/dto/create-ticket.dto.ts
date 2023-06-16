export class CreateTicketDto {
  constructor(
    public eventId: number,
    public price: number,
    public userId: number,
  ) {}
}
