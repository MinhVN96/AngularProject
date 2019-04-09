import { Component, OnInit } from '@angular/core';
import {ProductService} from '../shared/product.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../shared/product.model';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private products: Product[];
  constructor(private productService : ProductService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
    this.productService.getProductList();
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.productService.selectedProduct = {
      ProductID: null,
      Name: '',
      CategoryID:null,
      WarehouseID:null,
      Brand: '',
      Price: null,
      Count: null,
      Image: '',
      Status:''
    }
  }
 
  onSubmit(form: NgForm) {
    if (form.value.ProductID == null) {
      this.productService.postProduct(form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.productService.getProductList();
          this.toastr.success('New Record Added Succcessfully', 'Product Register');
        });
    }
    else {
      this.productService.putProduct(form.value.ProductID, form.value)
      .subscribe(data => {
        this.resetForm(form);
        this.productService.getProductList();
        this.toastr.info('Record Updated Successfully!', 'Product Register');
      });
    }
  }

  showForEdit(pro: Product) {
    this.productService.selectedProduct = Object.assign({}, pro);
  }
 
 
  onDelete(pro: Product) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.productService.deleteProduct(pro.ProductID)
      .subscribe(data => {
        this.productService.getProductList();
        this.toastr.warning("Deleted Successfully","Product Register");
      })
    }
  }

  
}
