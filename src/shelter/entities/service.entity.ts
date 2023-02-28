import { shelter_service as ShelterService } from 'prisma/client-db';

export class ServiceEntity implements ShelterService {
  shelterId: string;

  serviceAttribute: string;

  serviceValue: string;
}

export class Service {
  serviceAttribute: string;
  serviceValue: [string];
}
