export type Product = {
  id: number;
  title: string;
  price: string;
  imageUrl: string;
  types: string[];
  sizes: string[];
  categoryId: string;
};
export type Order = {
  id: number;
  title: string;
  price: string;
  imageUrl: string;
  types: string[];
  sizes: string[];
  categoryId: string;
  quantity: number;
};

export type Order2 = {
  name: string;
  location: string;
  phonenumber: string;
  orders: [];
  status: boolean;
  id:string
};

export type Category = {
  id: string;
  name: string;
};
