import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { ProductFormComponent } from './components/product-form/product-form.component';
import {MaterialModule} from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './components/nav/nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TableComponent } from './components/table/table.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { FormProductComponent } from './components/form-product/form-product.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';


@NgModule({
  declarations: [ProductFormComponent, NavComponent, DashboardComponent, TableComponent, ProductListComponent, FormProductComponent, ProductEditComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
