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
    this.productService.refreshList();
  }
  resetForm(form?: NgForm) {
    if  (form!=null)
      form.reset();
      this.productService.formData = {
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
  onSubmit(form: NgForm){
    if(form.value.ProductID == null){
    this.insertRecord(form)}
    if(form.value.ProductID != null){
    this.updateRecord(form)}
  }
 
  insertRecord(form: NgForm){
    this.productService.postProduct(form.value).subscribe(res=>{
      this.toastr.success("Inserted successfull",'Product Rigister ');
      this.resetForm(form);
      this.productService.refreshList();
    });
  }
  updateRecord(form: NgForm){
    
    this.productService.putProduct(form.value).subscribe(res=>{
      this.toastr.info("Updated successfull",'Product Rigister ');
      this.resetForm(form);
      this.productService.refreshList();
    });
  }

  populateForm(product:Product){
    this.productService.formData = product;
  }

  onDelete(id:number){
    if(confirm('Are you sure to delete record?')){
    this.productService.deleteProduct(id).subscribe(res=>{
      this.productService.refreshList();
      this.toastr.warning('Delete successfully','Product Register');
    });
  }
}
  
}
