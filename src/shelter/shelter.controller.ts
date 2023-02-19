import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ShelterService } from './shelter.service';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ShelterEntity } from './entities/shelter.entity';
import { ApiCreatedResponse } from '@nestjs/swagger';

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
  @UseGuards(AuthGuard)
  async create(@Body() createShelterDto: CreateShelterDto): Promise<ShelterEntity> {
    return this.shelterService.create(createShelterDto);
  }

  @Get('shelters')
  @UseGuards(AuthGuard)
  async findAll(): Promise<ShelterEntity[]> {
    return this.shelterService.findAll();
  }

  @Get('shelter/:id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string): Promise<ShelterEntity> {
    return this.shelterService.findOne(id);
  }

}
