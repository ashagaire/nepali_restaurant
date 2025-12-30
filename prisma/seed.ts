import { PrismaClient, SpiceLevel, Visibility } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  /* ------------------ ADMIN USER ------------------ */
  const admin = await prisma.user.create({
    data: {
      email: "admin@restaurant.com",
      password: "hashed-password", // replace later
      role: "ADMIN",
    },
  });

  /* ------------------ CATEGORIES ------------------ */
  await prisma.category.createMany({
    data: [
      { nameEn: "Starters", nameFi: "Alkuruoat", order: 1 },
      { nameEn: "Main Course", nameFi: "Pääruoat", order: 2 },
      { nameEn: "Seafood", nameFi: "Merenelävät", order: 3 },
      { nameEn: "Desserts", nameFi: "Jälkiruoat", order: 4 },
      { nameEn: "Kids Menu", nameFi: "Lasten menu", order: 5 },
    ],
  });

  const categories = await prisma.category.findMany();
  const getCategoryId = (nameEn: string) =>
    categories.find((c) => c.nameEn === nameEn)!.id;

  /* ------------------ TAGS ------------------ */
  const tags = [
    { nameEn: "veg", nameFi: "kasvis" },
    { nameEn: "nonveg", nameFi: "liha" },
    { nameEn: "vegan", nameFi: "vegaani" },
    { nameEn: "noLactose", nameFi: "laktoositon" },
    { nameEn: "chicken", nameFi: "kana" },
    { nameEn: "fish", nameFi: "kala" },
    { nameEn: "shrimp", nameFi: "katkarapu" },
    { nameEn: "lamb", nameFi: "lammas" },
    { nameEn: "kids", nameFi: "lapset" },
    { nameEn: "spicy", nameFi: "tulinen" },
  ];

  await prisma.tag.createMany({ data: tags });

  const allTags = await prisma.tag.findMany();
  const getTags = (...namesEn: string[]) =>
    allTags.filter((t) => namesEn.includes(t.nameEn));

  /* ------------------ INGREDIENTS ------------------ */
  const ingredientsData = [
    { nameEn: "Tomato", nameFi: "Tomaatti" },
    { nameEn: "Onion", nameFi: "Sipuli" },
    { nameEn: "Garlic", nameFi: "Valkosipuli" },
    { nameEn: "Cheese", nameFi: "Juusto" },
    { nameEn: "Chicken", nameFi: "Kana" },
    { nameEn: "Paneer", nameFi: "Paneer" },
    { nameEn: "Butter", nameFi: "Voi" },
    { nameEn: "Rice", nameFi: "Riisi" },
    { nameEn: "Spices", nameFi: "Mausteet" },
    { nameEn: "Cream", nameFi: "Kerma" },
  ];

  await prisma.ingredient.createMany({ data: ingredientsData });

  const ingredients = await prisma.ingredient.findMany();
  const getIngredients = (...namesEn: string[]) =>
    ingredients.filter((i) => namesEn.includes(i.nameEn));

  /* ------------------ MENU ITEMS ------------------ */
  const menuItems = [
    {
      nameEn: "Spring Rolls",
      nameFi: "Kevätkääryleet",
      descriptionEn: "Crispy vegetable spring rolls",
      descriptionFi: "Rapeat kasviskevätkääryleet",
      price: 6.99,
      servings: 1,
      spicey: SpiceLevel.LOW,
      category: "Starters",
      tags: ["veg"],
      ingredients: ["Tomato", "Cheese", "Onion"],
    },
    {
      nameEn: "Chicken Tikka",
      nameFi: "Kana Tikka",
      descriptionEn: "Grilled chicken with spices",
      descriptionFi: "Grillattua kanaa mausteilla",
      price: 9.99,
      servings: 1,
      spicey: SpiceLevel.MEDIUM,
      category: "Starters",
      tags: ["nonveg", "chicken"],
      ingredients: ["Tomato", "Cheese", "Onion"],
    },
    {
      nameEn: "Butter Chicken",
      nameFi: "Voikana",
      descriptionEn: "Creamy tomato chicken curry",
      descriptionFi: "Kermainen tomaattinen kanacurry",
      price: 14.99,
      servings: 1,
      spicey: SpiceLevel.MEDIUM,
      category: "Main Course",
      tags: ["nonveg", "chicken"],
      ingredients: ["Tomato", "Butter", "Cream", "Spices"],
    },
    {
      nameEn: "Paneer Masala",
      nameFi: "Paneer Masala",
      descriptionEn: "Cottage cheese curry",
      descriptionFi: "Paneer-juustocurry",
      price: 13.49,
      servings: 1,
      spicey: SpiceLevel.LOW,
      category: "Main Course",
      tags: ["veg"],
      ingredients: ["Paneer", "Butter", "Cream", "Spices"],
    },
    {
      nameEn: "Chocolate Cake",
      nameFi: "Suklaakakku",
      descriptionEn: "Rich chocolate dessert",
      descriptionFi: "Täyteläinen suklaajälkiruoka",
      price: 6.49,
      servings: 1,
      spicey: SpiceLevel.NO,
      category: "Desserts",
      tags: ["veg"],
      ingredients: ["Butter", "Cream"],
    },
  ];

  for (const item of menuItems) {
    await prisma.menuItem.create({
      data: {
        nameEn: item.nameEn,
        nameFi: item.nameFi,
        descriptionEn: item.descriptionEn,
        descriptionFi: item.descriptionFi,
        price: item.price,
        servings: item.servings,
        spicey: item.spicey,
        visibility: Visibility.PUBLIC,
        userId: admin.id,
        categoryId: getCategoryId(item.category),
        tags: {
          connect: getTags(...item.tags).map((t) => ({ id: t.id })),
        },
        ingredients: {
          connect: getIngredients(...item.ingredients).map((i) => ({
            id: i.id,
          })),
        },
      },
    });
  }

  console.log("✅ Seeding completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
