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
  const categories = await prisma.category.createMany({
    data: [
      { name: "Starters", order: 1 },
      { name: "Main Course", order: 2 },
      { name: "Seafood", order: 3 },
      { name: "Desserts", order: 4 },
      { name: "Kids Menu", order: 5 },
    ],
  });

  const categoryMap = await prisma.category.findMany();
  const getCategoryId = (name: string) =>
    categoryMap.find((c) => c.name === name)!.id;

  /* ------------------ TAGS ------------------ */
  const tagNames = [
    "veg",
    "nonveg",
    "vegan",
    "noLactose",
    "chicken",
    "fish",
    "shrimp",
    "lamb",
    "kids",
    "spicy",
  ];

  await prisma.tag.createMany({
    data: tagNames.map((name) => ({ name })),
  });

  const tags = await prisma.tag.findMany();
  const getTags = (...names: string[]) =>
    tags.filter((t) => names.includes(t.name));

  /* ------------------ INGREDIENTS  ------------------ */

  const ingredientNames = [
    "Tomato",
    "Onion",
    "Garlic",
    "Cheese",
    "Chicken",
    "Paneer",
    "Butter",
    "Rice",
    "Spices",
    "Cream",
  ];

  await prisma.ingredient.createMany({
    data: ingredientNames.map((name) => ({ name })),
  });

  const ingredients = await prisma.ingredient.findMany();
  const getIngredients = (...names: string[]) =>
    ingredients.filter((i) => names.includes(i.name));

  /* ------------------ MENU ITEMS ------------------ */
  const menuItems = [
    {
      name: "Spring Rolls",
      description: "Crispy vegetable spring rolls",
      price: 6.99,
      servings: 1,
      spicey: SpiceLevel.LOW,
      category: "Starters",
      tags: ["veg"],
      ingredients: ["Tomato", "Cheese", "Onion"],
    },
    {
      name: "Chicken Tikka",
      description: "Grilled chicken with spices",
      price: 9.99,
      servings: 1,
      spicey: SpiceLevel.MEDIUM,
      category: "Starters",
      tags: ["nonveg", "chicken"],
      ingredients: ["Tomato", "Cheese", "Onion"],
    },
    {
      name: "Butter Chicken",
      description: "Creamy tomato chicken curry",
      price: 14.99,
      servings: 1,
      spicey: SpiceLevel.MEDIUM,
      category: "Main Course",
      tags: ["nonveg", "chicken"],
      ingredients: ["Tomato", "Cheese", "Onion"],
    },
    {
      name: "Paneer Masala",
      description: "Cottage cheese curry",
      price: 13.49,
      servings: 1,
      spicey: SpiceLevel.LOW,
      category: "Main Course",
      tags: ["veg"],
      ingredients: ["Chicken", "Butter", "Cream", "Spices"],
    },
    {
      name: "Lamb Rogan Josh",
      description: "Slow cooked lamb curry",
      price: 16.99,
      servings: 1,
      spicey: SpiceLevel.HIGH,
      category: "Main Course",
      tags: ["nonveg", "lamb"],
      ingredients: ["Chicken", "Butter", "Cream", "Spices"],
    },
    {
      name: "Grilled Salmon",
      description: "Fresh salmon with herbs",
      price: 17.99,
      servings: 1,
      spicey: SpiceLevel.NO,
      category: "Seafood",
      tags: ["fish"],
      ingredients: ["Chicken", "Butter", "Cream", "Spices"],
    },
    {
      name: "Shrimp Curry",
      description: "Spicy shrimp curry",
      price: 15.99,
      servings: 1,
      spicey: SpiceLevel.HIGH,
      category: "Seafood",
      tags: ["shrimp", "spicy"],
      ingredients: ["Chicken", "Butter", "Cream", "Spices"],
    },
    {
      name: "Fish Fry",
      description: "Crispy fried fish",
      price: 12.99,
      servings: 1,
      spicey: SpiceLevel.MEDIUM,
      category: "Seafood",
      tags: ["fish"],
      ingredients: ["Chicken", "Butter", "Cream", "Spices"],
    },
    {
      name: "Chocolate Cake",
      description: "Rich chocolate dessert",
      price: 6.49,
      servings: 1,
      spicey: SpiceLevel.NO,
      category: "Desserts",
      tags: ["veg"],
      ingredients: ["Chicken", "Butter", "Cream", "Spices"],
    },
    {
      name: "Ice Cream",
      description: "Vanilla ice cream scoop",
      price: 4.99,
      servings: 1,
      spicey: SpiceLevel.NO,
      category: "Desserts",
      tags: ["veg"],
      ingredients: ["Chicken", "Butter", "Cream", "Spices"],
    },
    {
      name: "Fruit Salad",
      description: "Fresh seasonal fruits",
      price: 5.99,
      servings: 1,
      spicey: SpiceLevel.NO,
      category: "Desserts",
      tags: ["vegan"],
      ingredients: ["Chicken", "Butter", "Cream", "Spices"],
    },
    {
      name: "Kids Nuggets",
      description: "Chicken nuggets with fries",
      price: 7.99,
      servings: 1,
      spicey: SpiceLevel.NO,
      category: "Kids Menu",
      tags: ["kids", "chicken"],
      ingredients: ["Chicken", "Butter", "Cream", "Spices"],
    },
    {
      name: "Kids Pasta",
      description: "Creamy pasta for kids",
      price: 6.99,
      servings: 1,
      spicey: SpiceLevel.NO,
      category: "Kids Menu",
      tags: ["kids", "veg"],
      ingredients: ["Chicken", "Butter", "Cream", "Spices"],
    },
    {
      name: "Veg Burger",
      description: "Plant-based burger",
      price: 8.49,
      servings: 1,
      spicey: SpiceLevel.LOW,
      category: "Main Course",
      tags: ["vegan"],
      ingredients: ["Chicken", "Butter", "Cream", "Spices"],
    },
    {
      name: "Chicken Biryani",
      description: "Aromatic rice with chicken",
      price: 15.49,
      servings: 1,
      spicey: SpiceLevel.HIGH,
      category: "Main Course",
      tags: ["nonveg", "chicken"],
      ingredients: ["Chicken", "Butter", "Cream", "Spices"],
    },
    {
      name: "Garlic Naan",
      description: "Flatbread with garlic",
      price: 3.49,
      servings: 2,
      spicey: SpiceLevel.NO,
      category: "Starters",
      tags: ["veg"],
      ingredients: ["Chicken", "Butter", "Cream", "Spices"],
    },
  ];

  for (const item of menuItems) {
    await prisma.menuItem.create({
      data: {
        name: item.name,
        description: item.description,
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
