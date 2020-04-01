import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductFormComponent} from './components/product-form/product-form.component';
import {NavComponent} from './components/nav/nav.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {TableComponent} from './components/table/table.component';
import {ProductListComponent} from './components/product-list/product-list.component';
const routes: Routes = [
  
 
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path: 'created',
        component: ProductFormComponent,
      },
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'orders',
        component: TableComponent,
      },
      {
        path: 'products',
        component: ProductListComponent,
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
