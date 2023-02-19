import { Type } from 'class-transformer';
import { ShelterEntity } from './shelter.entity';
import { ShelterEntityJsonLdHelper } from './shelterJsonLdHelper.entity';

class ShelterEntityJsonLd {
  constructor(shelters: ShelterEntity[]) {
    this['@context'] = {
      'dc': 'http://purl.org/dc/elements/1.1/',
      'schema': 'http://schema.org/',
      'geojson': 'https://purl.org/geojson/vocab#',
    };
    this['dc:title'] = 'Lista rifugi';
    this['dc:description'] = 'Questo file contiene la lista dei rifugi correnti presenti nel database';
    this['dc:creator'] = 'hutmap.org';
    this['dc:date'] = new Date();
    this['dc:format'] = '.geojson';
    this['dc:language'] = 'it';
    this['dc:source'] = 'hutmap.org';
    this['dc:rights'] = 'CC BY-SA 4.0';
    this['@type'] = 'geojson:FeatureCollection';
    this['geojson:features'] = shelters.map((shelter) => new ShelterEntityJsonLdHelper(shelter));
  }

  '@context': {
    'dc': string;
    'schema': string;
    'geojson': string;
  };
  'dc:title': string;
  'dc:description': string;
  'dc:creator': string;
  'dc:date': Date;
  'dc:format': string;
  'dc:language': string;
  'dc:source': string;
  'dc:rights': string;
  '@type': string;
  'geojson:features': ShelterEntityJsonLdHelper[];
}

export { ShelterEntityJsonLd };