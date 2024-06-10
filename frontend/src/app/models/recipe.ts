export interface Recipe {
  _id: string;
  title: string;
  author: string;
  content: string[];
  categories?: string[];
  ingredients: string[];
  time?: number;
  image?: string;
  createdAt: string;
  updatedAt: string;
}
