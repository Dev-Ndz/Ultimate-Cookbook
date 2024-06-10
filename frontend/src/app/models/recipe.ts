export interface Recipe {
  _id: string;
  title: string;
  author: string;
  content: string[];
  categories?: string[];
  ingerdients: string[];
  time?: number;
  image?: string;
  createdAt: string;
  updatedAt: string;
}
