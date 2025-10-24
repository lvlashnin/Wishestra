export const WishIcon = {
  None: "",
  Baby: "Baby",
  Apple: "Apple",
  Car: "Car",
  Dog: "Dog",
  Cat: "Cat",
  Gift: "Gift",
  Heart: "Heart",
  Home: "Home",
  Star: "Star",
  Sun: "Sun",
  Moon: "Moon",
} as const;

export type WishIcon = (typeof WishIcon)[keyof typeof WishIcon];

export type Wish = {
  id?: number;
  image: WishIcon;
  title: string;
  description: string;
  price: number;
  createdAt?: string;
};
