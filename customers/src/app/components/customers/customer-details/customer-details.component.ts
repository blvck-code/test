import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Customer, Product } from 'src/app/models/customer.model';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  customerId: null;
  "customer": Customer;
  products: Product[] = [];

  addProduct: boolean = false;

  constructor(
    private _customerService: CustomersService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _fb: FormBuilder
  ) {

    _route.queryParamMap.subscribe((params: Params) => {
      if(params.get('id')){
        this.customerId = params.get('id');
        this._customerService.getCustomerById(+params.get('id')).subscribe(
          res => {
            this.customer = res
          },
          err => {
            _router.navigate(['/pageNotFound'])
          }
        )
      }
    })
  }

  productForm = this._fb.group({
    productName: ['', Validators.required],
    productDesc: ['', Validators.required],
    productQTY: ['', Validators.required],
  })

  addProductMode(){
    this.addProduct = !this.addProduct
  }

  ngOnInit(): void {
    this._customerService.getCustomerProducts(this.customerId).subscribe(
      res => {
        this.products = res
      }
    )
  }

  submitProduct(){
    this._customerService.addProduct(this.productForm.value, this.customerId).subscribe(
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }

}
