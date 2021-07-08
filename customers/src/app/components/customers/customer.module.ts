import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomerRoutingModule } from "./customer-routing.module";
import { CustomersComponent } from "./customers.component";
import { CustomerAddComponent } from "./customer-add/customer-add.component";
import { CustomerListComponent } from "./customer-list/customer-list.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CustomerDetailsComponent } from './customer-details/customer-details.component';

@NgModule({
    imports: [
        CommonModule,
        CustomerRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        CustomerAddComponent,
        CustomerListComponent,
        CustomersComponent,
        CustomerDetailsComponent
    ]
})

export class CustomerModule{}