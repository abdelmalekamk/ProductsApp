import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ActionEvent, ProductActionTypes } from 'src/state/product.state';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.css']
})
export class ProductsItemComponent implements OnInit{

  @Input() product?:Product;
  @Output() eventEmitter: EventEmitter<ActionEvent>=new EventEmitter<ActionEvent>();

  constructor(){}
  ngOnInit(): void {
  }

  onSelect(p: Product) {
    this.eventEmitter.emit({
      type: ProductActionTypes.SELECT_PRODUCT,
      payload: p});
  }

  onDelete(p: Product) {
    this.eventEmitter.emit({
      type: ProductActionTypes.DELETE_PRODUCT,
      payload: p});
  }

  onEdit(p: Product) {
    this.eventEmitter.emit({
      type: ProductActionTypes.EDIT_PRODUCT,
      payload: p});
  }

}
