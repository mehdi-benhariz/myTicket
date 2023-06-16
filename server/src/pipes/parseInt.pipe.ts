import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class CustomParseIntPipe
  implements PipeTransform<string, Promise<number>>
{
  async transform(value: string, metadata: ArgumentMetadata): Promise<number> {
    const parsedValue = parseInt(value, 10);

    if (isNaN(parsedValue))
      throw new BadRequestException('Must be a number !🛑');

    return parsedValue;
  }
}
