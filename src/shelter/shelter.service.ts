import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { ShelterEntity } from './entities/shelter.entity';
import { ShelterEntityJsonLd } from './entities/shelterJsonLd.entity';

@Injectable()
export class ShelterService {
  constructor(private prismaService: PrismaService) {}

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

  async findChanges(id: string): Promise<ShelterEntityJsonLd> {
    try {
      const shelters = await this.prismaService.shelter_archive.findMany({
        where: {
          id,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          amenities: true,
        },
      });

      return new ShelterEntityJsonLd(shelters);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  /**
   * Create a shelter
   * @param {CreateShelterDto} createShelterDto - The shelter to create
   * @return {Promise<ShelterEntity>} The created shelter
   * @throws {InternalServerErrorException} If an error occurs
   */
  async create(createShelterDto: CreateShelterDto): Promise<ShelterEntity> {
    try {
      const amenities = createShelterDto.amenities.map((shelterService) => ({
        serviceAttribute: shelterService.serviceAttribute,
        serviceValue: shelterService.serviceValue,
      }));

      const createdShelter = await this.prismaService.shelter.create({
        data: {
          ...createShelterDto,
          amenities: {
            create: amenities,
          },
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const createdShelterArchive =
        await this.prismaService.shelter_archive.create({
          data: {
            id: createdShelter.id,
            createdAt: createdShelter.createdAt,
            ...createShelterDto,
            amenities: {
              create: amenities,
            },
          },
        });

      return new ShelterEntity(createdShelter);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(
    id: string,
    updateShelterDto: CreateShelterDto,
  ): Promise<ShelterEntity> {
    try {
      const amenities = updateShelterDto.amenities.map((shelterService) => ({
        serviceAttribute: shelterService.serviceAttribute,
        serviceValue: shelterService.serviceValue,
      }));

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [deleted, updatedShelter, created] =
        await this.prismaService.$transaction([
          this.prismaService.shelter_service.deleteMany({
            where: {
              shelterId: updateShelterDto.id,
            },
          }),
          this.prismaService.shelter.update({
            where: {
              id: updateShelterDto.id,
            },
            data: {
              ...updateShelterDto,
              amenities: {
                create: amenities,
              },
            },
          }),
          this.prismaService.shelter_archive.create({
            data: {
              id: updateShelterDto.id,
              ...updateShelterDto,
              amenities: {
                create: amenities,
              },
            },
          }),
        ]);

      return new ShelterEntity(updatedShelter);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
