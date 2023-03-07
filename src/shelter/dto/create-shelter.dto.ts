import { ApiProperty } from '@nestjs/swagger';
import {
  shelter as Shelter,
  shelter_service as ShelterService,
} from 'prisma/client-db';

export class CreateShelterDto implements Omit<Shelter, 'createdAt'> {
  id: string;

  @ApiProperty({
    description: 'The name of the shelter',
    example: 'Rifugio Bruto Carestiato',
  })
  name: string;

  @ApiProperty({
    description: 'The province in which the shelter is located',
    example: 'Belluno',
  })
  province: string;

  @ApiProperty({
    description: 'The region in which the shelter is located',
    example: 'Veneto',
  })
  region: string;

  @ApiProperty({
    description: 'The services offered by the shelter',
    example: '[{ "serviceAttribute": "Wi-Fi", "serviceValue": "Available"}]',
  })
  amenities: ShelterService[];

  @ApiProperty({
    description: 'The website of the shelter',
    example: 'http://www.rifugiocarestiato.com',
  })
  url: string;

  @ApiProperty({
    description: 'The latitude of the shelter',
    example: '46.321330',
  })
  latitude: number;

  @ApiProperty({
    description: 'The longitude of the shelter',
    example: '12.070394',
  })
  longitude: number;

  author: string;
}
