import { NgModule } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { CustomerRosolverService } from "src/app/resolvers/customer-rosolver.service";
import { CustomerAddComponent } from "./customer-add/customer-add.component";
import { CustomerDetailsComponent } from "./customer-details/customer-details.component";
import { CustomerListComponent } from "./customer-list/customer-list.component";
import { CustomerUpdateComponent } from "./customer-update/customer-update.component";

const customerRoutes : Routes = [
    { path: '', component: CustomerListComponent},
    { path: 'add', component: CustomerAddComponent},
    { path: ':id', component: CustomerDetailsComponent},
]

@NgModule({
    imports: [
        RouterModule.forChild(customerRoutes)
    ],
    exports: [RouterModule],
})

export class CustomerRoutingModule{}