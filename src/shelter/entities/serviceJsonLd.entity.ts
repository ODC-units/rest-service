// eslint-disable-next-line import/no-cycle
import { ServiceEntity } from './service.entity';

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
