import { Type } from 'class-transformer';

class ShelterEntityJsonLd {
  '@context': {
    dc: 'A';
    schema: 'A';
    geojson: 'A';
  };
  'dc:title': 'A';
  'dc:description': 'A';
  'dc:creator': 'A';
  'dc:date': 'A';
  'dc:format': 'A';
  'dc:language': 'A';
  'dc:source': 'A';
  'dc:rights': 'A';
  '@type': 'geojson:FeatureCollection';
  'geojson:features': {
    '@type': 'schema:CreativeWork';
    'geojson:properties': {
      '@type': 'schema:Accommodation';
      'schema:name': string;
      'schema:description': string;
      'schema:address': {
        '@type': 'schema:PostalAddress';
        'schema:addressLocality': string;
        'schema:addressRegion': string;
        'schema:addressCountry': string;
      };
      'schema:amenityFeature': {
        '@type': 'schema:LocationFeatureSpecification';
        'schema:name': 'beds';
        'schema:value': number;
      };
      'schema:url': string;
      'schema:photo': string;
    }
    'geojson:geometry': {
      'geojson:type': 'geojson:Point';
      'geojson:coordinates': number[];
    };
    'schema:dateCreated': Date;
  }
}

export { ShelterEntityJsonLd };