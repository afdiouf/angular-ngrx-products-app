import { SaveProductActionError, UpdateProductAction } from './../../../ngrx/products.actions';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsState, ProductsStateEnum } from './../../../ngrx/products.reducer';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditProductAction } from 'src/app/ngrx/products.actions';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productID: number;
  state?: ProductsState;
  productFormGroup?: FormGroup;
  readonly ProductsStateEnum = ProductsStateEnum;
  formBuilt: boolean=false;
  submitted: boolean=false;

  constructor(private activatedRoute: ActivatedRoute, 
              private store: Store<any>,
              private fb: FormBuilder,
              private router: Router) {
    this.productID = activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.store.dispatch(new EditProductAction(this.productID));
    this.store.subscribe(state=>{ 
      this.state = state.catalogState;
      if (this.state?.dataState==ProductsStateEnum.LOADED) {
        if (this.state.currentProduct!=null) {
          this.productFormGroup = this.fb.group({
            id:[this.state.currentProduct.id],
            name:[this.state.currentProduct.name, Validators.required],
            price:[this.state.currentProduct.price, Validators.required],
            quantity:[this.state.currentProduct.quantity, Validators.required],
            selected:[this.state.currentProduct.selected],
            available:[this.state.currentProduct.available]
          });
          this.formBuilt = true;
        }
      }
    });
  }

  okUpdated(){
    this.router.navigateByUrl("/products");
  }

  onUpdateProduct(){
    this.submitted=true;
    if (this.productFormGroup?.invalid) return;
    this.store.dispatch(new UpdateProductAction(this.productFormGroup?.value));
  }

}
