import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.menuItem.createMany({
    data: [
      {
        name: "Momo",
        description: "Steamed dumplings with meat or veg",
        price: 8.99,
      },
      {
        name: "Dal Bhat",
        description: "Traditional lentils, rice & curry",
        price: 12.5,
      },
    ],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
