import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service'

import { ToastrService } from 'ngx-toastr'; 
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private productService: ProductService,private toastr : ToastrService) { }

  ngOnInit() {
    this.productService.getProductList();
  }
  
}
