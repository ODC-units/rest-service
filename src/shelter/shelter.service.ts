import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ShelterEntity } from './entities/shelter.entity';
import { ShelterEntityJsonLd } from './entities/shelterJsonLd.entity';

@Injectable()
export class ShelterService {
  constructor(private prismaService: PrismaService) {}

  /**
   * Create a shelter
   * @param {CreateShelterDto} createShelterDto - The shelter to create
   * @return {Promise<ShelterEntity>} The created shelter
   * @throws {InternalServerErrorException} If an error occurs
   */
  async create(createShelterDto: CreateShelterDto): Promise<ShelterEntity> {
    try {
      const amenities = createShelterDto.amenities.map((shelterService) => ({
        serviceId: shelterService.serviceId,
        value: shelterService.value,
      }));

      const createdShelter = await this.prismaService.shelter.create({
        data: {
          ...createShelterDto,
          amenities: {
            create: amenities,
          },
        },
      });

      return new ShelterEntity(createdShelter);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async findAll(
    region?: string,
    province?: string,
  ): Promise<ShelterEntityJsonLd> {
    try {
      const shelters = await this.prismaService.shelter.findMany({
        where: {
          region,
          province,
        },
        include: {
          amenities: true,
        },
      });

      return new ShelterEntityJsonLd(shelters);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string): Promise<ShelterEntityJsonLd> {
    try {
      const shelter = await this.prismaService.shelter.findUnique({
        where: {
          id,
        },
        include: {
          amenities: true,
        },
      });

      return new ShelterEntityJsonLd([shelter]);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
