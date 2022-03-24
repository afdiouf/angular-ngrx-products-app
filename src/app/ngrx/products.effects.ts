import { ProductsActionsTypes, GetAllProductsActionSuccess, GetAllProductsActionError, GetSelectedProductsActionSuccess, GetSelectedProductsActionError, SearchProductsActionSuccess, SearchProductsActionError, ProductsActions, SelectProductActionSuccess, SelectProductActionError, DeleteProductActionError, DeleteProductActionSuccess, NewProductActionSuccess, SaveProductActionSuccess, SaveProductActionError, EditProductActionSuccess, EditProductActionError, UpdateProductActionSuccess, UpdateProductActionError } from './products.actions';
import { ProductService } from './../services/product.service';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class ProductsEffects {

  constructor(private productService: ProductService, 
              private effectActions: Actions ) {}

  /* 
    **Get All Products Effect 
  */
  getAllProductsEffect: Observable<ProductsActions> = createEffect(
    ()=> this.effectActions.pipe(
      ofType(ProductsActionsTypes.GET_ALL_PRODUCTS),
      mergeMap((action: ProductsActions) => {
        return this.productService.getProducts()
          .pipe(
            map((products)=> new GetAllProductsActionSuccess(products)),
            catchError((err) => of(new GetAllProductsActionError(err.message)))
          )
      }),
    ),
  );

  /* 
    **Get Selected Products Effect 
  */
  getSelectedProductsEffect: Observable<ProductsActions> = createEffect(
    ()=> this.effectActions.pipe(
      ofType(ProductsActionsTypes.GET_SELECTED_PRODUCTS),
      mergeMap((action: ProductsActions) => {
        return this.productService.getSelectedProducts()
          .pipe(
            map((products)=> new GetSelectedProductsActionSuccess(products)),
            catchError((err) => of(new GetSelectedProductsActionError(err.message)))
          )
      }),
    ),
  );

  /* 
    **Search Products Effect 
  */
  searchProductsEffect: Observable<ProductsActions> = createEffect(
    ()=> this.effectActions.pipe(
      ofType(ProductsActionsTypes.SEARCH_PRODUCTS),
      mergeMap((action: ProductsActions) => {
        return this.productService.searchProducts(action.payload)
          .pipe(
            map((products)=> new SearchProductsActionSuccess(products)),
            catchError((err) => of(new SearchProductsActionError(err.message)))
          )
      }),
    ),
  );
  
  /* 
    **Select Product Effect 
  */
  selectProductEffect: Observable<ProductsActions> = createEffect(
    ()=> this.effectActions.pipe(
      ofType(ProductsActionsTypes.SELECT_PRODUCT),
      mergeMap((action: ProductsActions) => {
        return this.productService.setSelected(action.payload)
          .pipe(
            map((product)=> new SelectProductActionSuccess(product)),
            catchError((err) => of(new SelectProductActionError(err.message)))
          )
      }),
    ),
  );

  /* 
    **Delete Product Effect 
  */
  deleteProductEffect: Observable<ProductsActions> = createEffect(
    ()=> this.effectActions.pipe(
      ofType(ProductsActionsTypes.DELETE_PRODUCT),
      mergeMap((action: ProductsActions) => {
        return this.productService.delete(action.payload.id)
          .pipe(
            map(()=> new DeleteProductActionSuccess(action.payload)),
            catchError((err) => of(new DeleteProductActionError(err.message)))
          )
      }),
    ),
  );

  /* 
    **New Product Effect 
  */
  newProductEffect: Observable<ProductsActions> = createEffect(
    ()=> this.effectActions.pipe(
      ofType(ProductsActionsTypes.NEW_PRODUCT),
      map((action: ProductsActions) => {
        return new NewProductActionSuccess({});
      }),
    ),
  );

  /* 
    **Save Product Effect 
  */
  saveProductEffect: Observable<ProductsActions> = createEffect(
    ()=> this.effectActions.pipe(
      ofType(ProductsActionsTypes.SAVE_PRODUCT),
      mergeMap((action: ProductsActions) => {
        return this.productService.save(action.payload)
          .pipe(
            map((product)=> new SaveProductActionSuccess(product)),
            catchError((err) => of(new SaveProductActionError(err.message)))
          )
      }),
    ),
  );

  /* 
    **Edit Product Effect 
  */
  editProductEffect: Observable<ProductsActions> = createEffect(
    ()=> this.effectActions.pipe(
      ofType(ProductsActionsTypes.EDIT_PRODUCT),
      mergeMap((action: ProductsActions) => {
        return this.productService.getProductById(action.payload)
          .pipe(
            map((product)=> new EditProductActionSuccess(product)),
            catchError((err) => of(new EditProductActionError(err.message)))
          )
      }),
    ),
  );

  /* 
    **Update Product Effect 
  */
    updateProductEffect: Observable<ProductsActions> = createEffect(
      ()=> this.effectActions.pipe(
        ofType(ProductsActionsTypes.UPDATE_PRODUCT),
        mergeMap((action: ProductsActions) => {
          return this.productService.update(action.payload)
            .pipe(
              map((product)=> new UpdateProductActionSuccess(product)),
              catchError((err) => of(new UpdateProductActionError(err.message)))
            )
        }),
      ),
    );
   
}