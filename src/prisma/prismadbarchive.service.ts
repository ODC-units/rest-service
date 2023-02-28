import { INestApplication, Injectable } from '@nestjs/common';
import { PrismaClient as PrismaClientDbArchive } from 'prisma/client-db-archive';

@Injectable()
export class PrismaServiceDbArchive extends PrismaClientDbArchive {
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
