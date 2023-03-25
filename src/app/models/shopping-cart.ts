import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart{

  items: ShoppingCartItem[] = [];

  constructor(private itemsMap: { [productId: string]: ShoppingCartItem}) {
    this.itemsMap = itemsMap || {};
    for(let productId in itemsMap){
      let item = itemsMap[productId];
      //spread operator
      this.items.push(new ShoppingCartItem( {...item, $key: productId} ));
    }
  }

  getQuantity(product: Product){
    let item = this.itemsMap[product.$key];
    return item ? item.quantity : 0;
  }

  get totalItemsCount(): number {
    let count = 0;
    for(let productId in this.items)
      count += this.items[productId].quantity;
    return count;
  }

  get totalPrice(): number{
    let total = 0;
    for(let productId in this.items){
      total += this.items[productId].totalPrice;
    }
    return total;
  }
}
