import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiExcludeEndpoint,
} from '@nestjs/swagger';
import { MyId } from 'src/auth/decorators/current-user';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { Service, ServiceHelper } from './entities/service.entity';
import { ShelterEntity } from './entities/shelter.entity';
import { ShelterEntityJsonLd } from './entities/shelterJsonLd.entity';
import { ParseServicesPipe } from './pipes/parseServices';
import { ShelterService } from './shelter.service';

@Controller({
  version: '1',
  path: 'shelters',
})
export class ShelterController {
  constructor(private readonly shelterService: ShelterService) {}

  @Post()
  @ApiBody({
    type: CreateShelterDto,
    description:
      'The Description for the Post Body. Please look into the CreateShelterDTO for more information.',
    required: true,
  })
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
  @ApiBody({
    type: CreateShelterDto,
    description:
      'The Description for the Post Body. Please look into the CreateShelterDTO for more information.',
    required: true,
  })
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
    description:
      'This Decorator specifies the documentation for a specific Parameter, in this case the <b>region</b> Param.',
    required: false,
    examples: {
      a: {
        summary: 'Region is Veneto',
        description: 'Filter shelters located in Veneto region.',
        value: 'Veneto',
      },
    },
    type: String,
  })
  @ApiQuery({
    name: 'province',
    description:
      'This Decorator specifies the documentation for a specific Parameter, in this case the <b>province</b> Param.',
    required: false,
    examples: {
      a: {
        summary: 'Province is Belluno',
        description: 'Filter shelters located in Belluno region.',
        value: 'Belluno',
      },
    },
    type: String,
  })
  @ApiQuery({
    name: 'services',
    description:
      'This Decorator specifies the documentation for a specific Parameter, in this case the <b>services</b> Param. Example: (ServiceAttribute,ServiceValue - Restaurant,Available)',
    required: false,
    type: [String],
  })
  async findAll(
    @Query('region') region?: string,
    @Query('province') province?: string,
    @Query('services', new ParseServicesPipe()) services?: ServiceHelper[],
    @Req() request?: Request,
  ): Promise<ShelterEntityJsonLd> {
    return this.shelterService.findAll(region, province, services, request);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description:
      'This Decorator specifies the documentation for a specific Parameter, in this case the <b>id</b> Param.',
    required: false,
    examples: {
      a: {
        summary: 'Id is clex32p6j0016s6761hxeb4lf',
        description: 'Id of a shelter.',
        value: 'clex32p6j0016s6761hxeb4lf',
      },
    },
    type: String,
  })
  async findOne(
    @Param('id') id: string,
    @Req() request?: Request,
  ): Promise<ShelterEntityJsonLd> {
    return this.shelterService.findOne(id, request);
  }

  @Get(':id/history')
  @ApiParam({
    name: 'id',
    description:
      'This Decorator specifies the documentation for a specific Parameter, in this case the <b>id</b> Param.',
    required: false,
    examples: {
      a: {
        summary: 'Id is clex32p6j0016s6761hxeb4lf',
        description: 'Id of a shelter.',
        value: 'clex32p6j0016s6761hxeb4lf',
      },
    },
    type: String,
  })
  async findChanges(
    @Param('id') id: string,
    @Req() request?: Request,
  ): Promise<ShelterEntityJsonLd> {
    return this.shelterService.findChanges(id, request);
  }

  @ApiExcludeEndpoint()
  @Get('/get/services')
  async findServices(): Promise<Service[]> {
    console.log('findServices');
    return this.shelterService.findServices();
  }
}
