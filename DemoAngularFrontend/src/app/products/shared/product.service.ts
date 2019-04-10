import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import {Observable} from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Product} from './product.model'




@Injectable()
export class ProductService {
  selectedProduct : Product;
  productList: Product[];
  
  constructor(private http:Http) { }

  postProduct(prd:Product){
    var body= JSON.stringify(prd);
    var headersOptions= new Headers({'Content-Type':'application/json'});
    var requestOptions= new RequestOptions({method: RequestMethod.Post, headers: headersOptions});
    return this.http.post('http://localhost:64896/api/Products',body,requestOptions).map(x => x.json());
  }
  putProduct(id: string,prd: Product){
    var body = JSON.stringify(prd);
    var headersOptions= new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method: RequestMethod.Put, headers: headersOptions});
    return this.http.put('http://localhost:64896/api/Products/'+id, body,requestOptions).map(res=>res.json());
  }
  getProductList(){        
    return this.http.get('http://localhost:64896/api/Products').map((data:Response)=>{return data.json() as Product[];}).toPromise().then(x=>{this.productList=x;});
  }

  getProductById(id: string){        
    return this.http.get('http://localhost:64896/api/Products/'+id).map((data:Response)=>{return data.json() as Product[];}).toPromise().then(x=>{this.productList=x;});
  }
  deleteProduct(id: string) {
    var headersOptions= new Headers({'Content-Type':'application/json'});
    var requestOptions= new RequestOptions({method: RequestMethod.Delete, headers: headersOptions});
    return this.http.delete('http://localhost:64896/api/Products/' + id,requestOptions).map(res => res.json());
  }
  private getSelectedIndex(id: string) {
    for (var i = 0; i < this.productList.length; i++) {
        if (this.productList[i].ProductID == id) {
            return i;
        }
    }
    return -1;
  }
  find(id: string): Product {
    return this.productList[this.getSelectedIndex(id)];
  }

}
