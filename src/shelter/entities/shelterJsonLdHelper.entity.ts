import { ShelterEntity } from './shelter.entity';
// eslint-disable-next-line import/no-cycle
import { ServiceEntityJsonLd } from './serviceJsonLd.entity';

class ShelterEntityJsonLdHelper {
  constructor(shelter: ShelterEntity) {
    this['@type'] = 'schema:CreativeWork';
    this['geojson:properties'] = {
      '@type': 'schema:Accommodation',
      'schema:identifier': shelter.id,
      'schema:name': shelter.name,
      'schema:address': {
        '@type': 'schema:PostalAddress',
        'schema:addressLocality': shelter.province,
        'schema:addressRegion': shelter.region,
      },
      'schema:amenityFeature': shelter.amenities.map(
        (service) => new ServiceEntityJsonLd(service),
      ),
      'schema:url': shelter.url,
    };
    this['geojson:geometry'] = {
      'geojson:type': 'geojson:Point',
      'geojson:coordinates': [shelter.latitude, shelter.longitude],
    };
    this['schema:author'] = shelter.author;
    this['schema:uploadAt'] = shelter.createdAt;
  }

  '@type': string;

  'geojson:properties': {
    '@type': string;
    'schema:identifier': string;
    'schema:name': string;
    'schema:address': {
      '@type': string;
      'schema:addressLocality': string;
      'schema:addressRegion': string;
    };
    'schema:amenityFeature': ServiceEntityJsonLd[];
    'schema:url': string;
  };

  'geojson:geometry': {
    'geojson:type': string;
    'geojson:coordinates': number[];
  };

  'schema:author': string;

  'schema:dateCreated': Date;
}

export { ShelterEntityJsonLdHelper };
