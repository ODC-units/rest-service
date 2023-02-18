import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ShelterModule } from './shelter/shelter.module';
import { AuthModule } from './auth/auth.module';
import { CorsMiddleware } from './middleware/middleware';

@Module({
  imports: [PrismaModule, ShelterModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
