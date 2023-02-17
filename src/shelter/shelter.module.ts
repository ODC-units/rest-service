import { Module } from '@nestjs/common';
import { ShelterService } from './shelter.service';
import { ShelterController } from './shelter.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ShelterController],
  providers: [ShelterService],
  imports: [PrismaModule, AuthModule],
})
export class ShelterModule {}
