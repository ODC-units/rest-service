import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ShelterService } from './shelter.service';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ShelterEntity } from './entities/shelter.entity';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { ShelterEntityJsonLd } from './entities/shelterJsonLd.entity';

@Controller('v1')
export class ShelterController {
  constructor(private readonly shelterService: ShelterService) { }


  /**
   * POST /api/v1/shelter - Create a shelter
   * @param {CreateShelterDto} createShelterDto - The shelter to create
   * @return {Promise<UserEntity>} The created shelter
   */
  @Post('shelter')
  @ApiCreatedResponse({
    type: ShelterEntity,
    description: 'The created shelter',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async create(@Body() createShelterDto: CreateShelterDto): Promise<ShelterEntity> {
    return this.shelterService.create(createShelterDto);
  }

  @Get('shelters')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async findAll(): Promise<ShelterEntityJsonLd> {
    return this.shelterService.findAll();
  }

  @Get('shelter/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string): Promise<ShelterEntityJsonLd> {
    return this.shelterService.findOne(id);
  }

}
