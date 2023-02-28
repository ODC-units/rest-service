import { INestApplication, Injectable } from '@nestjs/common';
import { PrismaClient as PrismaClientDb } from 'prisma/client-db';

@Injectable()
export class PrismaServiceDb extends PrismaClientDb {
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
