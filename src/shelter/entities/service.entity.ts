import { ApiProperty } from '@nestjs/swagger';
import { Shelter, ShelterService } from '@prisma/client';
import { ShelterEntityJsonLd } from './shelterJsonLd.entity';

export class ServiceEntity implements ShelterService {
  shelterId: string;
  serviceId: string;
  value: string;
}
