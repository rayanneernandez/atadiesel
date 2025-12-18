export type CartItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  unitPrice: number;
  quantity: number;
  delivery: 'casa' | 'loja';
};

const cart: CartItem[] = [];

export function addToCart(item: CartItem) {
  const idx = cart.findIndex(i => i.id === item.id && i.delivery === item.delivery);
  if (idx >= 0) {
    cart[idx].quantity += item.quantity;
  } else {
    cart.push(item);
  }
}

export function updateQuantity(id: string, delivery: 'casa' | 'loja', quantity: number) {
  const idx = cart.findIndex(i => i.id === id && i.delivery === delivery);
  if (idx >= 0) {
    cart[idx].quantity = quantity;
  }
}

export function removeItem(id: string, delivery: 'casa' | 'loja') {
  const idx = cart.findIndex(i => i.id === id && i.delivery === delivery);
  if (idx >= 0) {
    cart.splice(idx, 1);
  }
}

export function getCart() {
  return cart;
}

export function clearCart() {
  cart.splice(0, cart.length);
}