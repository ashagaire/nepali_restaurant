export interface Service {
  id: number;
  serviceName: string;
  serviceDescription: string;
  image: string;
  link: string;
}

export const services: Service[] = [
  {
    id: 1,
    serviceName: "Lunch",
    serviceDescription:
      "We offer a Lunch from Monday to Friday, featuring a different menu every day. Find daily lunch menu details here.",
    image: "/gifs/lunch.gif",
    link: "/lunch",
  },
  {
    id: 2,
    serviceName: "À la Carte",
    serviceDescription:
      "Enjoy our cozy and welcoming atmosphere while savoring our authentic Nepalese dishes.",
    image: "/gifs/alacarte.gif",
    link: "/alacarte",
  },
  {
    id: 3,
    serviceName: "Bar",
    serviceDescription:
      "Explore Nepali beer and wine, as well as a selection of cocktails and mocktails.",
    image: "/gifs/drinks.gif",
    link: "/alacarte",
  },
  {
    id: 4,
    serviceName: "Takeaway",
    serviceDescription:
      "Order your favorite meals online and pick them up at your convenience.",
    image: "/gifs/takeAway.gif",
    link: "/menu",
  },
  {
    id: 5,
    serviceName: "Online Order",
    serviceDescription:
      "Get your meals delivered straight to your doorstep through our online order service.",
    image: "/gifs/onlineOrder.gif",
    link: "/menu",
  },
  {
    id: 6,
    serviceName: "Reservation",
    serviceDescription:
      "Make a reservation to secure your table and enjoy our authentic Nepalese cuisine with your preferred spice level in a cozy atmosphere.",
    image: "/gifs/reservation.gif",
    link: "/reservation",
  },
];
