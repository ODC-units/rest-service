import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ShelterEntity } from './entities/shelter.entity';

@Injectable()
export class ShelterService {
  constructor(private prismaService: PrismaService) { }

  /**
   * Create a shelter
   * @param {CreateShelterDto} createShelterDto - The shelter to create
   * @return {Promise<ShelterEntity>} The created shelter
   * @throws {InternalServerErrorException} If an error occurs
   */
  async create(createShelterDto: CreateShelterDto): Promise<ShelterEntity> {
    try {
      const createdShelter = await this.prismaService.shelter.create({
        data: createShelterDto,
      });

      return new ShelterEntity(createdShelter);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
