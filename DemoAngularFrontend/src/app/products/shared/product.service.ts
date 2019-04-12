import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Product} from './product.model'


@Injectable()
export class ProductService {
  formData: Product;
  listProduct:Product[];
  readonly rootUrl="http://localhost:64896/api";

  constructor(private http:HttpClient){}

  postProduct(formData: Product){
    return this.http.post(this.rootUrl+'/Products',formData)
  }

  refreshList(){
    this.http.get(this.rootUrl+'/Products').toPromise().then(
      res=>this.listProduct= res as Product[]
    );
  }

  putProduct(formData: Product){
    return this.http.put(this.rootUrl+'/Products/'+formData.ProductID,formData);
  }

  deleteProduct(id: number){
    return this.http.delete(this.rootUrl+'/Products/'+id);
  }
}
