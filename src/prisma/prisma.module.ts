import { Module } from '@nestjs/common';
import { PrismaServiceDb } from './prismadb.service';
import { PrismaServiceDbArchive } from './prismadbarchive.service';

@Module({
  providers: [PrismaServiceDb, PrismaServiceDbArchive],
  exports: [PrismaServiceDb, PrismaServiceDbArchive],
})
export class PrismaModule {}
