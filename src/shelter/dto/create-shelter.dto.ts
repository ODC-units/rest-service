import { ApiProperty } from '@nestjs/swagger';
import { Shelter } from '@prisma/client';

export class CreateShelterDto implements Omit<Shelter, 'createdAt' | 'updatedAt'> {

  @ApiProperty({
    description: 'The ID of the user',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  id: string;

  name: string;
  description: string;
  province: string;
  region: string;
  country: string;
  beds: number;
  url: string;
  photo: string;
  latitude: number;
  longitude: number;
}