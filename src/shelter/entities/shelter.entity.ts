import { ApiProperty } from '@nestjs/swagger';
import { Shelter } from '@prisma/client';
import { ShelterEntityJsonLd } from './shelterJsonLd.entity';

export class ShelterEntity implements Shelter {
  @ApiProperty({
    description: 'The ID of the shelter',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  id: string;

  @ApiProperty({
    description: 'The shelter name',
    example: 'john.doe@test.com',
  })
  name: string;

  @ApiProperty({
    description: 'The shelter description',
    example: 'John',
  })
  description: string;

  @ApiProperty({
    description: 'The latitude of the shelter',
    example: 46.227638,
  })
  latitude: number;
  longitude: number;

  constructor(partial: Partial<ShelterEntity>) {
    Object.assign(this, partial);
  }

  // TODO: Add the rest of the properties
  province: string;
  region: string;
  country: string;
  beds: number;
  url: string;
  photo: string;
  version: number;
  createdAt: Date;
}