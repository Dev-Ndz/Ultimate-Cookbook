import { ingredient } from './ingredient.interface';

export interface Recipe {
  _id?: string;
  title: string;
  author?: string;
  content: string[];
  categories?: string[];
  ingredients?: ingredient[];
  time?: number;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}
