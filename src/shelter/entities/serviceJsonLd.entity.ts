// eslint-disable-next-line import/no-cycle
import { ServiceEntity } from './service.entity';

class ServiceEntityJsonLd {
  constructor(service: ServiceEntity) {
    this['@type'] = 'LocationFeatureSpecification';
    this['schema:name'] = service.serviceAttribute;
    this['schema:value'] = service.serviceValue;
    this[
      'schema:url'
    ] = `https://storage.cloud.google.com/vocabularies/openshelterapi/vocabularies/${service.serviceAttribute}.json`;
  }

  '@type': string;

  'schema:name': string;

  'schema:value': string;

  'schema:url': string;
}

export { ServiceEntityJsonLd };
