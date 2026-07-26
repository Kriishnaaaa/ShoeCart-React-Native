import type {CartItem} from '../types/cart';

export const calculateCartSummary = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.shoe.price * item.quantity, 0);

  return {
    totalItems,
    totalPrice,
  };
};
