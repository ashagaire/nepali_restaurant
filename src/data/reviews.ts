interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  text: string;
  avatar?: string;
}

export const reviews: Review[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    date: "2 weeks ago",
    text: "Absolutely amazing food! The momos were the best I've ever had. The service was excellent and the atmosphere was warm and welcoming. Highly recommend!",
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 5,
    date: "1 month ago",
    text: "Authentic Nepalese cuisine at its finest. The thali was incredible and the staff was very friendly. Will definitely be coming back soon!",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    rating: 5,
    date: "3 weeks ago",
    text: "Delicious food and great portions. The dal bhat was authentic and reminded me of my trip to Nepal. The restaurant has a cozy atmosphere.",
  },
  {
    id: 4,
    name: "David Thompson",
    rating: 5,
    date: "1 week ago",
    text: "Outstanding experience! The chicken curry was perfectly spiced and the naan was fresh. The owner was very welcoming and explained the dishes.",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    rating: 5,
    date: "2 months ago",
    text: "Best Nepalese restaurant in town! The flavors are authentic and the presentation is beautiful. The staff goes above and beyond to make you feel welcome.",
  },
  {
    id: 6,
    name: "James Wilson",
    rating: 5,
    date: "3 days ago",
    text: "Fantastic food and service! The samosas were crispy and flavorful. The restaurant is clean and well-maintained. Highly recommend trying the lassi!",
  },
];
