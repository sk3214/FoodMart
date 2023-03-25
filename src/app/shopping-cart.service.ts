import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/product';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { ShoppingCart } from './models/shopping-cart';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async clearCart(){
    let cartId = await this.getorCreateCartId();
    this.db.object('/shopping-cart/'+cartId+'/items').remove();
  }

  private create(){
      return this.db.list('/shopping-cart').push({
        dateCreated: new Date().getTime()
      })
  }

  async getCart(): Promise<Observable<ShoppingCart>>{
    let cartId = await this.getorCreateCartId();
    return this.db.object('/shopping-cart/'+cartId).map(
      x => new ShoppingCart(x.items));
  }

  //aync method as synchronous
  private async getorCreateCartId(): Promise<string>{
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId',result.key);
    return result.key;
  }

  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-cart/'+ cartId +'/items/'+ productId);
  }

  async addToCart(product: Product){
    this.updateItem(product,1);
  }

  async removeFromCart(product: Product){
    this.updateItem(product,-1);
  }

  private async updateItem(product: Product, change: number){
    let cartId = await this.getorCreateCartId();
    let item$ = this.getItem(cartId,product.$key);

    item$.take(1).subscribe(item => {

      let quantity = (item.quantity || 0) + change
      if(quantity === 0) item$.remove();
      else item$.update({
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity:quantity
           });
    })
  }

}
