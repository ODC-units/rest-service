// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const shelter = await prisma.shelter.upsert({
    where: {id: 1},
    update: {},
    create: {
      id: 1,
      name: 'Prisma',
      latitude: 1,
      longitude: 1,
    }
  });

  console.log({ shelter });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });