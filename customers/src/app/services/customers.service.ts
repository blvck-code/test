import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment.prod';

import { Customer, Product } from '../models/customer.model'

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  _url = `${env.baseURL}/customers`
  _urlProduct = `${env.baseURL}/product`

  constructor(private _http: HttpClient) { }



  addCustomer(data: Customer):Observable<Customer>{
    return this._http.post<Customer>(`${this._url}/create`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  addProduct(data: Product, customer_id: any):Observable<Product>{
    return this._http.post<Product>(`${this._urlProduct}/create/${customer_id}`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  getCustomers():Observable<Customer[]>{
    return this._http.get<Customer[]>(this._url)
  }

  getCustomerProducts(customer_id: any):Observable<Product[]>{
    return this._http.get<Product[]>(`${this._urlProduct}/${customer_id}`)
  }

  getCustomerById(id: number):Observable<Customer>{
    return this._http.get<Customer>(`${this._url}/${id}`)
  }
  
}
