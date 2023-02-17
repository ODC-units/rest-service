import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ShelterService } from './shelter.service';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ShelterEntity } from './entities/shelter.entity';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('shelter')
export class ShelterController {
  constructor(private readonly shelterService: ShelterService) { }


  /**
   * POST /api/v1/users - Create a user
   * @param {CreateUserDto} createUserDto - The user to create
   * @return {Promise<UserEntity>} The created user
   */
  @Post()
  @ApiCreatedResponse({
    type: ShelterEntity,
    description: 'The created shelter',
  })
  async create(@Body() createUserDto: CreateShelterDto): Promise<ShelterEntity> {
    return this.shelterService.create(createUserDto);
  }

}
