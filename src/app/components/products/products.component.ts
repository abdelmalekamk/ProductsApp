import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.service';
import {catchError, map, Observable, of, startWith} from "rxjs";
import {ActionEvent, AppDataState, DataStateEnum, ProductActionTypes} from "../../../state/product.state";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$: Observable<AppDataState<Product[]>> |null = null ;
  readonly DataStateEnum = DataStateEnum ;

  constructor (private productService:ProductsService,private router:Router){}
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.onGetAllProducts()
  }

  onGetAllProducts() {
    this.products$= this.productService.getAllProducts().pipe(
      map(data=>{
        console.log(data);
        return ({dataState:DataStateEnum.LOADED,data:data})}),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.ERROR,errorMessage:err.message()}))
    );
  }

  onGetSelectedProducts() {
    this.products$= this.productService.getSelectedProducts().pipe(
      map(data=>{
        console.log(data);
        return ({dataState:DataStateEnum.LOADED,data:data})}),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.ERROR,errorMessage:err.message()}))
    );
  }

  onGetAvailableProducts() {
    this.products$= this.productService.getAvailableProducts().pipe(
      map(data=>{
        console.log(data);
        return ({dataState:DataStateEnum.LOADED,data:data})}),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.ERROR,errorMessage:err.message()}))
    );
  }

  onSearch(dataForm: any) {
    this.products$= this.productService.searchProducts(dataForm.keyword).pipe(
      map(data=>{
        console.log(data);
        return ({dataState:DataStateEnum.LOADED,data:data})}),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err => of({dataState:DataStateEnum.ERROR,errorMessage:err.message()}))
    );
  }

  onSelect(p: Product) {
    this.productService
      .select(p)
      .subscribe(data=>{p.selected=data.selected;})
  }

  onDelete(p: Product) {
    let v =confirm("Are you sure you want to delete this product ?")
    if (v)
    this.productService
      .deleteProduct(p).subscribe(data=>{this.onGetAllProducts();})
  }

  onAddNewProduct() {
  this.router.navigateByUrl("/newProduct");
  }

  onEdit(p: Product) {
    this.router.navigateByUrl("/editProduct/"+p.id);
  }

  onActionEvent($event: ActionEvent) {
    switch($event.type){
      case ProductActionTypes.GET_ALL_PRODUCTS: this.onGetAllProducts();break;
      case ProductActionTypes.GET_AVAILABLE_PRODUCTS: this.onGetAvailableProducts();break;
      case ProductActionTypes.GET_SELECTED_PRODUCTS: this.onGetSelectedProducts();break;
      case ProductActionTypes.SEARCH_PRODUCTS: this.onSearch($event.payload);break;
      case ProductActionTypes.NEW_PRODUCT: this.onAddNewProduct();break;
    }

    }
}
