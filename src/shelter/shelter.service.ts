import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ShelterEntity } from './entities/shelter.entity';
import { ShelterEntityJsonLd } from './entities/shelterJsonLd.entity';

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

  async findAll(): Promise<ShelterEntityJsonLd> {
    try {
      const shelters = await this.prismaService.shelter.findMany();

      console.log(shelters);


      //return shelters.map((shelter) => new ShelterEntity(shelter));
      return new ShelterEntityJsonLd(shelters);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string): Promise<ShelterEntityJsonLd> {
    try {
      const shelter = await this.prismaService.shelter.findUnique({
        where: {
          id,
        },
      });

      return new ShelterEntityJsonLd([shelter]);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

}
