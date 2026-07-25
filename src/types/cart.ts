import { Shoe } from './shoe';

export interface CartItem {
  shoe: Shoe;
  quantity: number;
  selectedSize: number;
}