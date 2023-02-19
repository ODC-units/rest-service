import { ApiProperty } from '@nestjs/swagger';
import { Shelter } from '@prisma/client';

export class CreateShelterDto implements Omit<Shelter, 'createdAt'> {

  @ApiProperty({
    description: 'The ID of the shelter',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the shelter',
    example: 'Rifugio Carestiato',
  })
  name: string;

  @ApiProperty({
    description: 'The description of the shelter',
    example: 'This shelter is located under the Carestiato mountain',
  })
  description: string;

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
    description: 'The country in which the shelter is located',
    example: 'IT',
  })
  country: string;

  @ApiProperty({
    description: 'The number of beds available in the shelter',
    example: '30',
  })
  beds: number;

  @ApiProperty({
    description: 'The url of the website of the shelter',
    example: 'www.example.com',
  })
  url: string;

  @ApiProperty({
    description: 'The photo of the shelter',
    example: 'www.example.com/photo.jpg',
  })
  photo: string;

  @ApiProperty({
    description: 'The latitude of the shelter',
    example: '46.227638',
  })
  latitude: number;

  @ApiProperty({
    description: 'The longitude of the shelter',
    example: '46.227638',
  })
  longitude: number;

  @ApiProperty({
    description: 'The version of the shelter',
    example: '1',
  })
  version: number;
}