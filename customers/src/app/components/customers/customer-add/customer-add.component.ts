import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {
  message: string = ''
  messageStatus: any = null

  constructor(
    private fb: FormBuilder,
    private _customerService: CustomersService
  ) { }

  clientForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    DOB: ['', Validators.required],
    idNumber: ['', Validators.required],
    phoneNumber: ['', Validators.required]
  })

  get getFirstName(){
    return this.clientForm.get('firstName')
  }

  get getLastName(){
    return this.clientForm.get('lastName')
  }

  get getDOB(){
    return this.clientForm.get('DOB')
  }

  get getIdNumber(){
    return this.clientForm.get('idNumber')
  }

  get getPhoneNumber(){
    return this.clientForm.get('phoneNumber')
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this._customerService.addCustomer(this.clientForm.value).subscribe(
      res => {
        this.onSuccess();
        this.clientForm.reset()
      },
      err => {
        this.onError()
      }
    )
  }

  onSuccess(){
    this.message = "Client added successfully";
    this.messageStatus = 200

    setTimeout(() => {
      this.message = '';
      this.messageStatus = null;
    }, 3000)
  }

  onError(){
    this.message = "Failed to add customer. Please try again.";
    this.messageStatus = 400;

    setTimeout(() => {
      this.message = '';
      this.messageStatus = null;
    }, 3000)
  }

}
