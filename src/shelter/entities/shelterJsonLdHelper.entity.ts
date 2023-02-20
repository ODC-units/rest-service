import { Type } from 'class-transformer';
import { ShelterEntity } from './shelter.entity';

class ShelterEntityJsonLdHelper {

  constructor(shelter: ShelterEntity) {
    this['@type'] = 'schema:CreativeWork';
    this['geojson:properties'] = {
      '@type': 'schema:Accommodation',
      'schema:identifier': shelter.id,
      'schema:name': shelter.name,
      'schema:description': shelter.description,
      'schema:address': {
        '@type': 'schema:PostalAddress',
        'schema:addressLocality': shelter.province,
        'schema:addressRegion': shelter.region,
        'schema:addressCountry': shelter.country,
      },
      'schema:amenityFeature': {
        '@type': 'schema:LocationFeatureSpecification',
        'schema:name': 'Letti',
        'schema:value': shelter.beds,
      },
      'schema:url': shelter.url,
      'schema:photo': shelter.photo,
    };
    this['geojson:geometry'] = {
      'geojson:type': 'geojson:Point',
      'geojson:coordinates': [shelter.latitude, shelter.longitude],
    };
    this['schema:author'] = shelter.author;
    this['schema:dateCreated'] = shelter.createdAt;
  }

  '@type': string;
  'geojson:properties': {
    '@type': string;
    'schema:identifier': string;
    'schema:name': string;
    'schema:description': string;
    'schema:address': {
      '@type': string;
      'schema:addressLocality': string;
      'schema:addressRegion': string;
      'schema:addressCountry': string;
    };
    'schema:amenityFeature': {
      '@type': string;
      'schema:name': string;
      'schema:value': number;
    };
    'schema:url': string;
    'schema:photo': string;
  }
  'geojson:geometry': {
    'geojson:type': string;
    'geojson:coordinates': number[];
  };
  'schema:author': string;
  'schema:dateCreated': Date;
}

export { ShelterEntityJsonLdHelper };