import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { ShelterService } from './shelter.service';
import { ShelterController } from './shelter.controller';

@Module({
  controllers: [ShelterController],
  providers: [ShelterService],
  imports: [PrismaModule, AuthModule],
})
export class ShelterModule {}
