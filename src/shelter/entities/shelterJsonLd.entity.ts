import { ShelterEntity } from './shelter.entity';
// eslint-disable-next-line import/no-cycle
import { ShelterEntityJsonLdHelper } from './shelterJsonLdHelper.entity';

class ShelterEntityJsonLd {
  constructor(identifier: string, shelters: ShelterEntity[]) {
    this['@context'] = {
      dc: 'http://purl.org/dc/elements/1.1/',
      schema: 'http://schema.org/',
      geojson: 'https://purl.org/geojson/vocab#',
    };
    this['dc:title'] = `${shelters.length} italian shelters`;
    this[
      'dc:description'
    ] = `List of italian shelters that are located in region [${shelters
      .map((shelters) => shelters.region)
      .join(', ')}]`;
    this['dc:creator'] = 'Open Shelter API';
    this[
      'dc:identifier'
    ] = `https://rest-service-hnlijallya-oa.a.run.app${identifier}`;
    this['dc:date'] = new Date();
    this['dc:format'] = '.jsonld';
    this['dc:language'] = 'en';
    this['dc:source'] = 'https://www.openshelterapi.com';
    this['dc:rights'] =
      'Open Data Commons Open Database License (ODbL) - https://opendatacommons.org/licenses/odbl/1.0/';
    this['@type'] = 'geojson:FeatureCollection';
    this['geojson:features'] = shelters.map(
      (shelter) => new ShelterEntityJsonLdHelper(shelter),
    );
  }

  '@context': {
    dc: string;
    schema: string;
    geojson: string;
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
