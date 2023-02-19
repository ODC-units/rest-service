export interface GeoJsonSchema {
  '@context': {
    dc: string;
    schema: string;
    geojson: string;
  };
  'dc:title': string;
  'dc:description': string;
  'dc:creator': string;
  'dc:date': string;
  'dc:format': string;
  'dc:language': string;
  'dc:source': string;
  'dc:rights': string;
  '@type': string;
  'geojson:features': {
    '@type': string;
    'geojson:properties': any;
    'geojson:geometry': {
      'geojson:type': string;
      'geojson:coordinates': number[];
    };
    'schema:author': string;
    'schema:dateCreated': string;
  }[];
}