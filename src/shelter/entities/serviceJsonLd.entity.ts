// eslint-disable-next-line import/no-cycle
import { ServiceEntity } from './service.entity';

class ServiceEntityJsonLd {
  constructor(service: ServiceEntity) {
    this['@type'] = 'LocationFeatureSpecification';
    this['schema:name'] = service.serviceAttribute;
    this['schema:value'] = service.serviceValue;
    this['schema:url'] = service.serviceAttribute;
  }

  '@type': string;

  'schema:name': string;

  'schema:value': string;

  'schema:url': string;
}

export { ServiceEntityJsonLd };
