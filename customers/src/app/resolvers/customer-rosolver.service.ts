import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
import { CustomersService } from '../services/customers.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerRosolverService implements Resolve<any> {

  constructor(
    private _customerService: CustomersService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Customer[]> {
    return this._customerService.getCustomers();
  }
}
