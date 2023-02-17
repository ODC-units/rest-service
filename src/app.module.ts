import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ShelterModule } from './shelter/shelter.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, ShelterModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
