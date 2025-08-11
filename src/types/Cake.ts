export interface Cake {
  id: number | undefined;
  name: string;
  category: string[];
  subtitle: string;
  description: string;
  price: number;
  weight: number | undefined;
  images: string[];
}
