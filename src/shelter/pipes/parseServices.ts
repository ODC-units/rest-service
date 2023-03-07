import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ServiceHelper } from '../entities/service.entity';

@Injectable()
export class ParseServicesPipe
  implements PipeTransform<string[] | string | undefined, ServiceHelper[]>
{
  transform(
    value: string[] | string,
    metadata: ArgumentMetadata,
  ): ServiceHelper[] {
    const services: ServiceHelper[] = [];

    if (!value) {
      return services;
    }

    if (typeof value === 'string') {
      value = [value];
    }

    value.forEach((service) => {
      const [attribute, value] = service.split(',');
      services.push({ attribute, value });
    });

    return services;
  }
}
