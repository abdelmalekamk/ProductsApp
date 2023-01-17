import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.service';
import {catchError, map, Observable, of, startWith} from "rxjs";
import {ActionEvent, AppDataState, DataStateEnum, ProductActionTypes} from "../../../state/product.state";
import {Router} from "@angular/router";
import { EventDriverService } from 'src/app/services/event.driver.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$: Observable<AppDataState<Product[]>> |null = null ;
  readonly DataStateEnum = DataStateEnum ;

  constructor (
    private productService:ProductsService,
    private router:Router,
    private eventDriverService:EventDriverService){}

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.onGetAllProducts()
    this.eventDriverService.sourceEventSubjectObservable.subscribe((actionEvent:ActionEvent)=>{
      this.onActionEventProduct(actionEvent);
    })
    
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
    if (p.id == null) return ;
    this.productService
      .select(p)
      .subscribe(data=>{p.selected=data.selected;})
  }

  onDelete(p: Product) {
    if (p.id == null) return ;
    console.log(p);
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

  onActionEventProduct($event: ActionEvent) {
    switch($event.type){
      case ProductActionTypes.SELECT_PRODUCT: this.onSelect($event.payload);break;
      case ProductActionTypes.DELETE_PRODUCT: this.onDelete($event.payload);break;
      case ProductActionTypes.EDIT_PRODUCT: this.onEdit($event.payload);break;
      case ProductActionTypes.GET_ALL_PRODUCTS: this.onGetAllProducts();break;
      case ProductActionTypes.GET_AVAILABLE_PRODUCTS: this.onGetAvailableProducts();break;
      case ProductActionTypes.GET_SELECTED_PRODUCTS: this.onGetSelectedProducts();break;
      case ProductActionTypes.SEARCH_PRODUCTS: this.onSearch($event.payload);break;
      case ProductActionTypes.NEW_PRODUCT: this.onAddNewProduct();break;
    }
    }
    
  // onActionEventProductList($event: ActionEvent) {
  //   switch($event.type){
  //     case ProductActionTypes.SELECT_PRODUCT: this.onSelect($event.payload);break;
  //     case ProductActionTypes.DELETE_PRODUCT: this.onDelete($event.payload);break;
  //     case ProductActionTypes.EDIT_PRODUCT: this.onEdit($event.payload);break;
  //   }
  //   }
  
  //   onActionEventNavBar($event: ActionEvent) {
  //     switch($event.type){
  //       case ProductActionTypes.GET_ALL_PRODUCTS: this.onGetAllProducts();break;
  //       case ProductActionTypes.GET_AVAILABLE_PRODUCTS: this.onGetAvailableProducts();break;
  //       case ProductActionTypes.GET_SELECTED_PRODUCTS: this.onGetSelectedProducts();break;
  //       case ProductActionTypes.SEARCH_PRODUCTS: this.onSearch($event.payload);break;
  //       case ProductActionTypes.NEW_PRODUCT: this.onAddNewProduct();break;
  //     }
  //   }
}
