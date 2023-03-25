import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Product } from './../models/product';
import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products: Product[] = [];
  filteredProducts : Product[] = [];
  cart$ : Observable<ShoppingCart>;
  category: string;

  constructor(private route:ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService) {}

  async ngOnInit(){
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }

  private populateProducts(){

    this.productService
      .getAll()
      .switchMap(products => {
      this.products = products;
      return this.route.queryParamMap;
    })
    .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
    });
  }

  private applyFilter(){
    this.filteredProducts = (this.category)?
      this.products.filter(p => p.category === this.category):
      this.products;
  }


}
