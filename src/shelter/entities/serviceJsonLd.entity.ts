import { Type } from 'class-transformer';
import { ServiceEntity } from './service.entity';
import { ShelterEntityJsonLdHelper } from './shelterJsonLdHelper.entity';

class ServiceEntityJsonLd {
  constructor(service: ServiceEntity) {
    this['@type'] = 'LocationFeatureSpecification';
    this['schema:name'] = service.serviceId;
    this['schema:value'] = service.value;
    this['schema:url'] = service.serviceId;
  }

  '@type': string;
  'schema:name': string;
  'schema:value': string;
  'schema:url': string;
}

export { ServiceEntityJsonLd };
