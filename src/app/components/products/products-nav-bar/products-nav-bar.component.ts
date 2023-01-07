import { Component, EventEmitter, Output } from '@angular/core';
import { ActionEvent, ProductActionTypes } from 'src/state/product.state';

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent {
@Output() productEventEmitter : EventEmitter<ActionEvent> = new EventEmitter();
constructor(){}
ngOnInit():void{
  
}
onSearch(dataForm: any) {
  this.productEventEmitter.emit({type:ProductActionTypes.SEARCH_PRODUCTS,payload:dataForm});
}
onAddNewProduct() {
  this.productEventEmitter.emit({type:ProductActionTypes.NEW_PRODUCT});
}
onGetSelectedProducts() {
  this.productEventEmitter.emit({type:ProductActionTypes.GET_SELECTED_PRODUCTS});
}

onGetAvailableProducts() {
  this.productEventEmitter.emit({type:ProductActionTypes.GET_AVAILABLE_PRODUCTS});
}

onGetAllProducts() {
  this.productEventEmitter.emit({type:ProductActionTypes.GET_ALL_PRODUCTS});
}

}
