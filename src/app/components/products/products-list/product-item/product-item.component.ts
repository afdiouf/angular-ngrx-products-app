import { Router } from '@angular/router';
import { SelectProductAction, DeleteProductAction } from './../../../../ngrx/products.actions';
import { Product } from './../../../../model/product.model';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product!: Product;

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
  }

  onSelect(product: Product) {
    this.store.dispatch(new SelectProductAction(product));
  }

  onDelete(product: Product) {
    this.store.dispatch(new DeleteProductAction(product));
  }

  onEdit(product: Product){
    this.router.navigateByUrl("/editProduct/"+product.id);
  }

}
