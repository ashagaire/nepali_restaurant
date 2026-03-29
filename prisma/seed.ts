import { PrismaClient, SpiceLevel, Visibility, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database with FULL Ravintola Monal menu...");

  // 1. Setup Admin User
  const admin = await prisma.user.upsert({
    where: { email: "admin@restaurant.com" },
    update: {},
    create: { email: "admin@restaurant.com", role: UserRole.ADMIN },
  });

  // 2. Setup Categories
  const categoriesData = [
    { nameEn: "Starters", nameFi: "Alkuruoat", order: 1 },
    { nameEn: "Vegetarian Dishes", nameFi: "Kasvisruoat", order: 2 },
    { nameEn: "Chicken Dishes", nameFi: "Kanaruoat", order: 3 },
    { nameEn: "Lamb Dishes", nameFi: "Lammasruoat", order: 4 },
    { nameEn: "Fish & Seafood", nameFi: "Kala- ja äyriäisruoat", order: 5 },
    { nameEn: "Tandoori & Grill", nameFi: "Tandoori ja Grilli", order: 6 },
    { nameEn: "Breads", nameFi: "Leivät", order: 7 },
    { nameEn: "Desserts", nameFi: "Jälkiruoat", order: 8 },
  ];

  for (const cat of categoriesData) {
    await prisma.category.upsert({
      where: { nameEn: cat.nameEn },
      update: cat,
      create: cat,
    });
  }
  const allCats = await prisma.category.findMany();
  const getCatId = (en: string) => allCats.find((c) => c.nameEn === en)!.id;

  // 3. Setup Tags
  const tagsData = [
    { nameEn: "Gluten-free", nameFi: "Gluteeniton", symbol: "G" },
    { nameEn: "Lactose-free", nameFi: "Laktoositon", symbol: "L" },
    { nameEn: "Vegan", nameFi: "Vegaani", symbol: "V" },
  ];

  for (const tag of tagsData) {
    await prisma.tag.upsert({
      where: { nameEn: tag.nameEn },
      update: tag,
      create: tag,
    });
  }

  // Explicitly type the tags or ensure the query is fresh
  const allTags = await prisma.tag.findMany();

  // The fix: Use a type guard or ensure the property access is safe
  const getTagIds = (symbols: string[]) =>
    allTags
      .filter((t) => t.symbol && symbols.includes(t.symbol))
      .map((t) => ({ id: t.id }));

  // 4. Full Menu Data
  const fullMenu = [
    /* STARTERS */
    {
      nameEn: "Tomato Soup",
      nameFi: "Tomaattikeitto",
      descEn: "Fresh tomato in creamy soup",
      descFi: "Tuoretta tomaattia kermasisessa keitossa",
      price: 6.0,
      cat: "Starters",
      tags: ["G", "L"],
      spice: SpiceLevel.NO,
    },
    {
      nameEn: "Mix Veg Pakora",
      nameFi: "Kasvis-pakora",
      descEn: "Deep fried vegetables coated with gram flour",
      descFi: "Friteerattuja kasviksia kikhernejauhokuoressa",
      price: 6.5,
      cat: "Starters",
      tags: ["G", "L"],
      spice: SpiceLevel.LOW,
    },
    {
      nameEn: "Vegetable Samosa",
      nameFi: "Kasvis-samosa",
      descEn: "Pastry stuffed with potatoes, peas and spices (2pcs)",
      descFi: "Perunalla ja herneillä täytetty leivonnainen (2kpl)",
      price: 7.0,
      cat: "Starters",
      tags: ["L"],
      spice: SpiceLevel.LOW,
    },
    {
      nameEn: "Paneer Tikka",
      nameFi: "Paneer Tikka",
      descEn: "Grilled cottage cheese with yogurt and spices",
      descFi: "Tandoori-uunissa grillattua tuorejuustoa",
      price: 7.5,
      cat: "Starters",
      tags: ["G"],
      spice: SpiceLevel.LOW,
    },
    {
      nameEn: "Chicken Soup",
      nameFi: "Kanakeitto",
      descEn: "Chicken soup with Indian herbs",
      descFi: "Kanakeitto intialaisilla yrteillä",
      price: 7.5,
      cat: "Starters",
      tags: ["G", "L"],
      spice: SpiceLevel.LOW,
    },

    /* VEGETARIAN */
    {
      nameEn: "Dal Tarka",
      nameFi: "Dal Tarka",
      descEn: "Lentils with onions and fresh tomatoes",
      descFi: "Linssejä, sipulia ja tuoreita tomaatteja",
      price: 12.5,
      cat: "Vegetarian Dishes",
      tags: ["G", "L"],
      spice: SpiceLevel.MEDIUM,
    },
    {
      nameEn: "Palak Paneer",
      nameFi: "Palak Paneer",
      descEn: "Cottage cheese and spinach in herbs sauce",
      descFi: "Tuorejuustoa ja pinaattia yrttikastikkeessa",
      price: 16.5,
      cat: "Vegetarian Dishes",
      tags: ["G"],
      spice: SpiceLevel.LOW,
    },
    {
      nameEn: "Paneer Butter Masala",
      nameFi: "Paneer Butter Masala",
      descEn: "Cheese in rich tomato and butter sauce",
      descFi: "Tuorejuustoa tomaatti-voi-kermakastikkeessa",
      price: 16.5,
      cat: "Vegetarian Dishes",
      tags: ["G"],
      spice: SpiceLevel.NO,
    },
    {
      nameEn: "Alu Gobi Masala",
      nameFi: "Alu Gobi Masala",
      descEn: "Cauliflower and potatoes with onion-tomato sauce",
      descFi: "Kukkakaalia ja perunaa sipuli-tomaattikastikkeessa",
      price: 14.0,
      cat: "Vegetarian Dishes",
      tags: ["G", "L"],
      spice: SpiceLevel.MEDIUM,
    },
    {
      nameEn: "Malai Kofta",
      nameFi: "Malai Kofta",
      descEn: "Potato-cheese dumplings in cream sauce",
      descFi: "Peruna-juustopyöryköitä kermakastikkeessa",
      price: 16.0,
      cat: "Vegetarian Dishes",
      tags: ["G"],
      spice: SpiceLevel.NO,
    },

    /* CHICKEN */
    {
      nameEn: "Butter Chicken",
      nameFi: "Voikana",
      descEn: "Grilled chicken in tomato-butter sauce",
      descFi: "Grillattua kanaa tomaatti-voi-kermakastikkeessa",
      price: 17.9,
      cat: "Chicken Dishes",
      tags: ["G", "L"],
      spice: SpiceLevel.NO,
    },
    {
      nameEn: "Chicken Tikka Masala",
      nameFi: "Kana Tikka Masala",
      descEn: "Grilled chicken with onions and ginger",
      descFi: "Grillattua kanaa sipuli-inkivääri-tomaattikastikkeessa",
      price: 18.2,
      cat: "Chicken Dishes",
      tags: ["G", "L"],
      spice: SpiceLevel.HIGH,
    },
    {
      nameEn: "Chicken Korma",
      nameFi: "Kana Korma",
      descEn: "Chicken in mild creamy sauce",
      descFi: "Kanaa miedossa kermakastikkeessa",
      price: 17.5,
      cat: "Chicken Dishes",
      tags: ["G", "L"],
      spice: SpiceLevel.NO,
    },
    {
      nameEn: "Chicken Garlic",
      nameFi: "Valkosipulikana",
      descEn: "Chicken in garlic masala sauce",
      descFi: "Kanaa valkosipuli-masalakastikkeessa",
      price: 17.5,
      cat: "Chicken Dishes",
      tags: ["G", "L"],
      spice: SpiceLevel.MEDIUM,
    },

    /* LAMB */
    {
      nameEn: "Lamb Korma",
      nameFi: "Lammas Korma",
      descEn: "Lamb in creamy onion sauce",
      descFi: "Lammasta kermasisessa sipulikastikkeessa",
      price: 18.5,
      cat: "Lamb Dishes",
      tags: ["G", "L"],
      spice: SpiceLevel.NO,
    },
    {
      nameEn: "Lamb Kadhai",
      nameFi: "Lamb Kadhai",
      descEn: "Lamb with capsicum and coriander seeds",
      descFi: "Lammasta, paprikaa ja korianterin siemeniä",
      price: 19.8,
      cat: "Lamb Dishes",
      tags: ["G", "L"],
      spice: SpiceLevel.MEDIUM,
    },
    {
      nameEn: "Lamb Kolapuri",
      nameFi: "Lammas Kolapuri",
      descEn: "Lamb in spicy coconut-onion sauce",
      descFi: "Lammasta tulisessa kookos-sipulikastikkeessa",
      price: 18.5,
      cat: "Lamb Dishes",
      tags: ["G", "L"],
      spice: SpiceLevel.HIGH,
    },

    /* FISH */
    {
      nameEn: "Fish Curry",
      nameFi: "Kalacurry",
      descEn: "Salmon in traditional curry sauce",
      descFi: "Lohta perinteisessä currykastikkeessa",
      price: 18.5,
      cat: "Fish & Seafood",
      tags: ["G", "L"],
      spice: SpiceLevel.MEDIUM,
    },
    {
      nameEn: "King Prawn Butter Masala",
      nameFi: "Jättikatkarapu Butter Masala",
      descEn: "King prawns in tomato-butter sauce",
      descFi: "Jättikatkarapuja tomaatti-voi-kermakastikkeessa",
      price: 20.5,
      cat: "Fish & Seafood",
      tags: ["G", "L"],
      spice: SpiceLevel.NO,
    },

    /* BREADS */
    {
      nameEn: "Plain Naan",
      nameFi: "Naan-leipä",
      descEn: "Traditional white bread",
      descFi: "Perinteinen intialainen leipä",
      price: 3.0,
      cat: "Breads",
      tags: [],
      spice: SpiceLevel.NO,
    },
    {
      nameEn: "Garlic Naan",
      nameFi: "Valkosipuli-naan",
      descEn: "Naan with fresh garlic",
      descFi: "Valkosipulilla maustettu naan",
      price: 3.5,
      cat: "Breads",
      tags: [],
      spice: SpiceLevel.NO,
    },

    /* DESSERTS */
    {
      nameEn: "Gulab Jamun",
      nameFi: "Gulab Jamun",
      descEn: "Deep fried milk solids in syrup",
      descFi: "Friteerattuja maitopalloja siirapissa",
      price: 5.7,
      cat: "Desserts",
      tags: [],
      spice: SpiceLevel.NO,
    },
    {
      nameEn: "Mango Lassi",
      nameFi: "Mango Lassi",
      descEn: "Yogurt drink with mango",
      descFi: "Jogurttijuoma mangolla",
      price: 4.5,
      cat: "Desserts",
      tags: ["G"],
      spice: SpiceLevel.NO,
    },
  ];

  for (const item of fullMenu) {
    await prisma.menuItem.create({
      data: {
        nameEn: item.nameEn,
        nameFi: item.nameFi,
        descriptionEn: item.descEn,
        descriptionFi: item.descFi,
        price: item.price,
        servings: 1,
        spicey: item.spice,
        userId: admin.id,
        categoryId: getCatId(item.cat),
        tags: { connect: getTagIds(item.tags) },
      },
    });
  }

  console.log("✅ Full dataset seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
