import { Action } from '@ngrx/store';
import { ProductsActions, ProductsActionsTypes } from './products.actions';
import { Product } from './../model/product.model';

export enum ProductsStateEnum {
  LOADING = "Loading",
  LOADED = "Loaded",
  ERROR = "Error",
  INITIAL = "Initial",
  NEW = "NEW",
  EDIT = "EDIT",
  UPDATED = "UPDATED"
}

export interface ProductsState {
  products: Product[],
  errorMessage: string,
  dataState: ProductsStateEnum,
  currentProduct: Product|null
}

const initState : ProductsState = {
  products: [],
  errorMessage: "",
  dataState: ProductsStateEnum.INITIAL,
  currentProduct: null
}

export function productsReducer(state = initState, action: Action): ProductsState {
  switch (action.type) {

    /* Get All products */
    case ProductsActionsTypes.GET_ALL_PRODUCTS:
      return {...state, dataState: ProductsStateEnum.LOADING};
    case ProductsActionsTypes.GET_ALL_PRODUCTS_SUCCESS:
      return {...state, dataState: ProductsStateEnum.LOADED, products: (<ProductsActions>action).payload};
    case ProductsActionsTypes.GET_ALL_PRODUCTS_ERROR:
      return {...state, dataState: ProductsStateEnum.ERROR, errorMessage: (<ProductsActions>action).payload};

    /* Get Selected products */
    case ProductsActionsTypes.GET_SELECTED_PRODUCTS:
      return {...state, dataState: ProductsStateEnum.LOADING};
    case ProductsActionsTypes.GET_SELECTED_PRODUCTS_SUCCESS:
      return {...state, dataState: ProductsStateEnum.LOADED, products: (<ProductsActions>action).payload};
    case ProductsActionsTypes.GET_SELECTED_PRODUCTS_ERROR:
      return {...state, dataState: ProductsStateEnum.ERROR, errorMessage: (<ProductsActions>action).payload};

    /* Search products */
    case ProductsActionsTypes.SEARCH_PRODUCTS:
      return {...state, dataState: ProductsStateEnum.LOADING};
    case ProductsActionsTypes.SEARCH_PRODUCTS_SUCCESS:
      return {...state, dataState: ProductsStateEnum.LOADED, products: (<ProductsActions>action).payload};
    case ProductsActionsTypes.SEARCH_PRODUCTS_ERROR:
      return {...state, dataState: ProductsStateEnum.ERROR, errorMessage: (<ProductsActions>action).payload};

    /* Select product */
    case ProductsActionsTypes.SELECT_PRODUCT:
      return {...state, dataState: ProductsStateEnum.LOADING};
    case ProductsActionsTypes.SELECT_PRODUCT_SUCCESS:
      let product: Product = (<ProductsActions>action).payload;
      let listProducts = [...state.products];
      let data: Product[] = listProducts.map(p=>(p.id==product.id) ? product:p);
      return {...state, dataState: ProductsStateEnum.LOADED, products: data};
    case ProductsActionsTypes.SELECT_PRODUCT_ERROR:
      return {...state, dataState: ProductsStateEnum.ERROR, errorMessage: (<ProductsActions>action).payload};

    /* Delete product */
    case ProductsActionsTypes.DELETE_PRODUCT:
      return {...state, dataState: ProductsStateEnum.LOADING};
    case ProductsActionsTypes.DELETE_PRODUCT_SUCCESS:
      let p: Product = (<ProductsActions>action).payload;
      let index = state.products.indexOf(p);
      let productsList = [...state.products];
      productsList.splice(index, 1);
      return {...state, dataState: ProductsStateEnum.LOADED, products: productsList};
    case ProductsActionsTypes.DELETE_PRODUCT_ERROR:
      return {...state, dataState: ProductsStateEnum.ERROR, errorMessage: (<ProductsActions>action).payload};

    /* New product */
    case ProductsActionsTypes.NEW_PRODUCT:
      return {...state, dataState: ProductsStateEnum.LOADING};
    case ProductsActionsTypes.NEW_PRODUCT_SUCCESS:
      return {...state, dataState: ProductsStateEnum.NEW};
    case ProductsActionsTypes.NEW_PRODUCT_ERROR:
      return {...state, dataState: ProductsStateEnum.ERROR, errorMessage: (<ProductsActions>action).payload};

    /* Save product */
    case ProductsActionsTypes.SAVE_PRODUCT:
      return {...state, dataState: ProductsStateEnum.LOADING};
    case ProductsActionsTypes.SAVE_PRODUCT_SUCCESS:
      let prods:Product[]=[...state.products];
      prods.push((<ProductsActions>action).payload);
      return {...state, dataState: ProductsStateEnum.LOADED, products:prods};
    case ProductsActionsTypes.SAVE_PRODUCT_ERROR:
      return {...state, dataState: ProductsStateEnum.ERROR, errorMessage: (<ProductsActions>action).payload};

    /* Edit product */
    case ProductsActionsTypes.EDIT_PRODUCT:
      return {...state, dataState: ProductsStateEnum.LOADING};
    case ProductsActionsTypes.EDIT_PRODUCT_SUCCESS:
      return {...state, dataState: ProductsStateEnum.LOADED, currentProduct: (<ProductsActions>action).payload};
    case ProductsActionsTypes.EDIT_PRODUCT_ERROR:
      return {...state, dataState: ProductsStateEnum.ERROR, errorMessage: (<ProductsActions>action).payload};

    /* Update product */
    case ProductsActionsTypes.UPDATE_PRODUCT:
      return {...state, dataState: ProductsStateEnum.LOADING};
    case ProductsActionsTypes.UPDATE_PRODUCT_SUCCESS:
      let updatedProduct: Product = (<ProductsActions>action).payload;
      let updatedProducts = state.products.map( p => (p.id==updatedProduct.id) ? updatedProduct:p );
      return {...state, dataState: ProductsStateEnum.UPDATED, products:updatedProducts};
    case ProductsActionsTypes.UPDATE_PRODUCT_ERROR:
      return {...state, dataState: ProductsStateEnum.ERROR, errorMessage: (<ProductsActions>action).payload};

    /* Default products */
    default:
      return {...state};
  }
}