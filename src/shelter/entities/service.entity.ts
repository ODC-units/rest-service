import { ShelterService } from '@prisma/client';

export class ServiceEntity implements ShelterService {
  shelterId: string;

  serviceId: string;

  value: string;
}
