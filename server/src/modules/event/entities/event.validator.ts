import { IsDateString, IsString } from 'class-validator';

export class EventValidator {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsDateString()
  date: Date;
  @IsString()
  place: string;
}
