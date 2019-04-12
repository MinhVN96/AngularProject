import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Product} from '../products/shared/product.model';
import {ProductService} from '../products/shared/product.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: Product[] ;
  upproducts: Product[] = [];
  selectedProduct : Subject<any> = new Subject;
  total:number = 0;
  delit:number = 0;

  constructor(private productService:ProductService) {
    
	 }

	 ngOnInit() {
		this.productService.refreshList();
		this.totalPrice();
  }

  getpopup(det) {
    this.selectedProduct.next(det);
  }

  delpopup(pid){
    console.log(pid);
    for(var i=0;i<this.productService.listProduct.length;i++){
      if(this.productService.listProduct[i].ProductID === pid)
      {  
        this.productService.listProduct.splice(i,1);
      }           
    }
    this.totalPrice();
    console.log(this.productService.listProduct);
  }


  totalPrice(){
    this.total = 0;
    for(var i=0;i<this.products.length;i++){
      this.total += (this.productService.listProduct[i].Price * this.productService.listProduct[i].Count);
    }
  }

  add(pid){
    console.log(pid);
    for(var i=0;i<this.productService.listProduct.length;i++){
      if(this.productService.listProduct[i].ProductID === pid)
      {  
        this.productService.listProduct[i].Count += 1;
      }           
    }
    this.totalPrice();
    console.log(this.productService.listProduct);
  }

  del(pid){
    console.log(pid);
    for(var i=0;i<this.productService.listProduct.length;i++){
      if(this.productService.listProduct[i].ProductID === pid)
      {  
        this.productService.listProduct[i].Count -= 1;
      }           
    }
    this.totalPrice();
    console.log(this.productService.listProduct);
  }
 
}
