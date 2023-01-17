import { Component, EventEmitter, Output } from '@angular/core';
import { EventDriverService } from 'src/app/services/event.driver.service';
import { ActionEvent, ProductActionTypes } from 'src/state/product.state';

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent {
//@Output() productEventEmitter : EventEmitter<ActionEvent> = new EventEmitter();
constructor(private eventDriverService:EventDriverService){}
ngOnInit():void{
  
}
onSearch(dataForm: any) {
  //this.productEventEmitter.emit({type:ProductActionTypes.SEARCH_PRODUCTS,payload:dataForm});
  this.eventDriverService.publishEvent({type:ProductActionTypes.SEARCH_PRODUCTS,payload:dataForm});
}
onAddNewProduct() {
  //this.productEventEmitter.emit({type:ProductActionTypes.NEW_PRODUCT});
  this.eventDriverService.publishEvent({type:ProductActionTypes.NEW_PRODUCT});
}
onGetSelectedProducts() {
  //this.productEventEmitter.emit({type:ProductActionTypes.GET_SELECTED_PRODUCTS});
  this.eventDriverService.publishEvent({type:ProductActionTypes.GET_SELECTED_PRODUCTS});
}

onGetAvailableProducts() {
  //this.productEventEmitter.emit({type:ProductActionTypes.GET_AVAILABLE_PRODUCTS});
  this.eventDriverService.publishEvent({type:ProductActionTypes.GET_AVAILABLE_PRODUCTS});
}

onGetAllProducts() {
  //this.productEventEmitter.emit({type:ProductActionTypes.GET_ALL_PRODUCTS});
  this.eventDriverService.publishEvent({type:ProductActionTypes.GET_ALL_PRODUCTS});
}

}
