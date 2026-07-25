import { CartItem } from './cart';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  createdAt: string;
}