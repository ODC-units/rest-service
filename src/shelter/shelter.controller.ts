import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth, ApiCreatedResponse, ApiQuery } from '@nestjs/swagger';
import { MyId } from 'src/auth/decorators/current-user';
import { ShelterService } from './shelter.service';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { ShelterEntity } from './entities/shelter.entity';
import { ShelterEntityJsonLd } from './entities/shelterJsonLd.entity';

@Controller({
  version: '1',
  path: 'shelters',
})
export class ShelterController {
  constructor(private readonly shelterService: ShelterService) {}

  @Post()
  @ApiCreatedResponse({
    type: ShelterEntity,
    description: 'The created shelter',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async create(
    @Body() createShelterDto: CreateShelterDto,
    @MyId() id: string,
  ): Promise<ShelterEntity> {
    return this.shelterService.create({
      ...createShelterDto,
      author: id,
    });
  }

  @Put(':id')
  @ApiCreatedResponse({
    type: ShelterEntity,
    description: 'The updated shelter',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async update(
    @MyId() id: string,
    @Body() createShelterDto: CreateShelterDto,
    @MyId() author: string,
  ): Promise<ShelterEntity> {
    return this.shelterService.update(id, { ...createShelterDto, author });
  }

  @Get()
  @ApiQuery({
    name: 'region',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'province',
    required: false,
    type: String,
  })
  async findAll(
    @Query('region') region?: string,
    @Query('province') province?: string,
  ): Promise<ShelterEntityJsonLd> {
    return this.shelterService.findAll(region, province);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ShelterEntityJsonLd> {
    return this.shelterService.findOne(id);
  }

  @Get(':id/history')
  async findChanges(@Param('id') id: string): Promise<ShelterEntityJsonLd> {
    return this.shelterService.findChanges(id);
  }
}
