export type DietaryRequirement = 'L' | 'G' | 'V' | 'M' | 'P';

export interface LunchItem {
  id: string;
  name: string;
  description: string;
  price: number;
  dietary: DietaryRequirement[];
  isSpicy?: boolean;
  isVeg?: boolean;
}

export interface DailyMenu {
  day: string;
  dayIndex: number; // 1: Monday, 2: Tuesday ... 5: Friday
  notice: string;
  items: LunchItem[];
}

const defaultNotice = "Lunch includes a rich salad buffet, daily soup, naan bread, basmati rice, raita, coffee, and tea.";

export const lunchMenuData: DailyMenu[] = [
  {
    day: "Monday",
    dayIndex: 1,
    notice: defaultNotice,
    items: [
      { id: "1", name: "Saag Paneer", description: "Fresh cheese in a mild spinach-cream sauce.", price: 13.50, dietary: ['G'], isVeg: true },
      { id: "2", name: "Tofu Chili", description: "Tofu and bell pepper in a tomato-onion-chili-soy sauce.", price: 13.50, dietary: ['L', 'G', 'V'], isSpicy: true, isVeg: true },
      { id: "3", name: "Butter Chicken", description: "Tandoori oven grilled chicken breast pieces in a tomato-butter cream sauce.", price: 14.50, dietary: ['L', 'G'] },
      { id: "4", name: "Lamb Masala", description: "Stewed lamb fillet pieces in a spicy ginger-tomato-masala sauce.", price: 15.00, dietary: ['L', 'G'], isSpicy: true },
      { id: "5", name: "Lunch Mix", description: "Choose any two dishes from the list above on the same plate.", price: 16.50, dietary: [] },
    ]
  },
  {
    day: "Tuesday",
    dayIndex: 2,
    notice: defaultNotice,
    items: [
      { id: "1", name: "Butter Paneer", description: "Bread cheese pieces in a butter-cream sauce.", price: 13.50, dietary: ['G'], isVeg: true },
      { id: "2", name: "Eggplant Masala", description: "Eggplant and potato in a rich onion-tomato-masala sauce.", price: 13.50, dietary: ['L', 'G', 'V'], isSpicy: true, isVeg: true },
      { id: "3", name: "Garlic Chicken", description: "Stewed chicken breast pieces in a slightly spicy garlic-onion-tomato sauce.", price: 14.50, dietary: ['L', 'G'], isSpicy: true },
      { id: "4", name: "Lamb Curry", description: "Stewed lamb pieces in a spicy tomato-onion-curry sauce.", price: 15.00, dietary: ['L', 'G'], isSpicy: true },
      { id: "5", name: "Lunch Mix", description: "Choose any two dishes from the list above on the same plate.", price: 16.50, dietary: [] },
    ]
  },
  {
    day: "Wednesday",
    dayIndex: 3,
    notice: defaultNotice,
    items: [
      { id: "1", name: "Malai Kofta", description: "Soft cheese-potato balls in a rich cashew-tomato-cream sauce.", price: 13.50, dietary: ['G'], isVeg: true },
      { id: "2", name: "Alu Gobi Tofu", description: "Potato, cauliflower, and tofu in a savory sauce.", price: 13.50, dietary: ['L', 'G', 'V'], isVeg: true },
      { id: "3", name: "Chicken Korma", description: "Stewed chicken in a mild cashew-cream sauce.", price: 14.50, dietary: ['L', 'G'] },
      { id: "4", name: "Lamb Saag", description: "Stewed lamb pieces in a spinach-garlic sauce.", price: 15.00, dietary: ['L', 'G'] },
      { id: "5", name: "Lunch Mix", description: "Choose any two dishes from the list above on the same plate.", price: 16.50, dietary: [] },
    ]
  },
  {
    day: "Thursday",
    dayIndex: 4,
    notice: defaultNotice,
    items: [
      { id: "1", name: "Kadai Paneer", description: "Fresh cheese, bell pepper, and onion in a spicy tomato sauce.", price: 13.50, dietary: ['G', 'P'], isVeg: true, isSpicy: true },
      { id: "2", name: "Hariyali Kofta", description: "Vegetable balls in a mild spinach sauce.", price: 13.50, dietary: ['L', 'G', 'V'], isVeg: true },
      { id: "3", name: "Butter Chicken", description: "Tandoori grilled chicken with a rich butter sauce.", price: 14.50, dietary: ['L', 'G'] },
      { id: "4", name: "Lamb Vindaloo", description: "Stewed lamb in a very spicy vindaloo sauce.", price: 15.00, dietary: ['L', 'G', 'P', 'M'], isSpicy: true },
      { id: "5", name: "Lunch Mix", description: "Choose any two dishes from the list above on the same plate.", price: 16.50, dietary: [] },
    ]
  },
  {
    day: "Friday",
    dayIndex: 5,
    notice: defaultNotice,
    items: [
      { id: "1", name: "Butter Paneer", description: "Fresh cheese pieces in a butter-cream sauce.", price: 13.50, dietary: ['G'], isVeg: true },
      { id: "2", name: "Tofu Chana Achari", description: "Tofu and chickpeas in a tangy pickle-flavored sauce.", price: 13.50, dietary: ['L', 'G', 'V', 'P', 'M'], isSpicy: true, isVeg: true },
      { id: "3", name: "Chicken Tikka Masala", description: "Tandoori marinated chicken in a heavily spiced masala sauce.", price: 14.50, dietary: ['L', 'G', 'P'], isSpicy: true },
      { id: "4", name: "Lamb Kofta", description: "Minced lamb meatballs in a savory sauce.", price: 15.00, dietary: ['L', 'G'] },
      { id: "5", name: "Lunch Mix", description: "Choose any two dishes from the list above on the same plate.", price: 16.50, dietary: [] },
    ]
  }
];
