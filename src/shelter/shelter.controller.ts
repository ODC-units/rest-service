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
   * POST /api/v1/users - Create a user
   * @param {CreateShelterDto} createShelterDto - The user to create
   * @return {Promise<UserEntity>} The created user
   */
  @Post()
  @ApiCreatedResponse({
    type: ShelterEntity,
    description: 'The created shelter',
  })
  async create(@Body() createShelterDto: CreateShelterDto): Promise<ShelterEntity> {
    return this.shelterService.create(createShelterDto);
  }

  @Get('shelters')
  @UseGuards(AuthGuard)
  async findAll(): Promise<ShelterEntity[]> {
    return this.shelterService.findAll();
  }

}
