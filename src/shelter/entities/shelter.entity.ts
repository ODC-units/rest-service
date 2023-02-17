import { ApiProperty } from '@nestjs/swagger';
import { Shelter } from '@prisma/client';
import { Expose } from 'class-transformer';

export class ShelterEntity implements Shelter {
  @ApiProperty({
    description: 'The ID of the shelter',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  id: string;

  @ApiProperty({
    description: 'The description of the shelter',
    example: 'john.doe@test.com',
  })
  name: string;

  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  description: string;

  @ApiProperty({
    description: 'The latitude of the shelter',
    example: 46.227638,
  })
  latitude: number;

  @ApiProperty({
    description: 'The longitude of the shelter',
    example: 46.227638,
  })
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
  createdAt: Date;
  updatedAt: Date;
}