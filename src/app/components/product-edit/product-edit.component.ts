import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../services/products.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../model/product.model";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit{
  productId:number
  productFormGroup?:FormGroup;
  submitted:boolean=false;
  constructor(private activatedRoute:ActivatedRoute,
              private productervice:ProductsService,
              private formBuilder:FormBuilder) {
    ({id: this.productId} = activatedRoute.snapshot.params);
  }

  ngOnInit(): void {
    this.productervice.getProduct(this.productId)
      .subscribe(product=>
        this.productFormGroup=this.formBuilder.group({
          id : [product.id,Validators.required],
          name : [product.name,Validators.required],
          price : [product.price,Validators.required],
          quantity : [product.quantity,Validators.required],
          selected : [product.selected,Validators.required],
          available : [product.available,Validators.required]
      }));
  }

  onUpdateProduct() {
    debugger
    this.productervice.updateProduct(this.productFormGroup?.value)
      .subscribe(data=>{
        alert("Success product update !!! xD")
      })
  }
}
