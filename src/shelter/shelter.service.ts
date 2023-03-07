import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaServiceDb } from 'src/prisma/prismadb.service';
import { PrismaServiceDbArchive } from 'src/prisma/prismadbarchive.service';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { Service, ServiceHelper } from './entities/service.entity';
import { ShelterEntity } from './entities/shelter.entity';
import { ShelterEntityJsonLd } from './entities/shelterJsonLd.entity';

@Injectable()
export class ShelterService {
  constructor(
    private prismaServiceDb: PrismaServiceDb,
    private prismaServiceDbArchive: PrismaServiceDbArchive,
  ) {}

  async findAll(
    region?: string,
    province?: string,
    services?: ServiceHelper[],
  ): Promise<ShelterEntityJsonLd> {
    try {
      const shelters = await this.prismaServiceDb.shelter.findMany({
        where: {
          AND: [
            { region: region },
            { province: province },
            ...services?.map((service) => ({
              amenities: {
                some: {
                  serviceAttribute: service.attribute,
                  serviceValue: service.value,
                },
              },
            })),
          ],
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
      const shelter = await this.prismaServiceDb.shelter.findUnique({
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
      const shelters =
        await this.prismaServiceDbArchive.shelter_archive.findMany({
          where: {
            id: id,
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

  async findServices(): Promise<Service[]> {
    try {
      const services = await this.prismaServiceDb.service.findMany({
        orderBy: {
          attribute: 'asc',
        },
      });

      const mappedServices = services.reduce((acc, curr) => {
        if (!acc[curr.attribute]) {
          acc[curr.attribute] = [curr.value];
        } else {
          acc[curr.attribute].push(curr.value);
        }
        return acc;
      }, {});

      const service = Object.keys(mappedServices).map((key) => ({
        serviceAttribute: key,
        serviceValue: mappedServices[key],
      }));

      return service;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async create(createShelterDto: CreateShelterDto): Promise<ShelterEntity> {
    try {
      const amenities = createShelterDto.amenities.map((shelterService) => ({
        serviceAttribute: shelterService.serviceAttribute,
        serviceValue: shelterService.serviceValue,
      }));

      const createdShelter = await this.prismaServiceDb.shelter.create({
        data: {
          ...createShelterDto,
          amenities: {
            create: amenities,
          },
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const createdShelterArchive =
        await this.prismaServiceDbArchive.shelter_archive.create({
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
      console.log(error);
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
        await this.prismaServiceDb.$transaction([
          this.prismaServiceDb.shelter_service.deleteMany({
            where: {
              shelterId: updateShelterDto.id,
            },
          }),
          this.prismaServiceDb.shelter.update({
            where: {
              id: updateShelterDto.id,
            },
            data: {
              ...updateShelterDto,
              amenities: {
                create: amenities,
              },
              createdAt: new Date(),
            },
          }),
          this.prismaServiceDbArchive.shelter_archive.create({
            data: {
              id: updateShelterDto.id,
              ...updateShelterDto,
              amenities: {
                create: amenities,
              },
              createdAt: new Date(),
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
