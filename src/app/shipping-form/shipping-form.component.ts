import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from './../shopping-cart.service';
import { ShoppingCart } from './../models/shopping-cart';
import { Subscription } from 'rxjs/Subscription';
import { OrderService } from './../order.service';
import { Order } from './../models/order';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  @Input('cart') cart : ShoppingCart;
  shipping = <any>{};
  userSubscription: Subscription;
  userId: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private OrderService: OrderService) { }


  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.OrderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key])
  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy(){

    this.userSubscription.unsubscribe();
  }

}
