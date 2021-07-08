import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = []

  constructor(
    private _customerService: CustomersService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._customerService.getCustomers().subscribe(
      res => {
        this.customers = res
      },
      err => {
        console.log(err)
      }
    )
  }

  navigateDetail(customer: Customer){
    this._router.navigate(['/customers', customer.id], {
      queryParams: {
        id: customer.id,
        customer: customer.firstName
      }
    })
  }

}
