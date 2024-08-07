import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ManageProductComponent } from './pages/manage-product/manage-product.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminComponent} from './admin.component';
import { DetailProductComponent} from './pages/detail-product/detail-product.component';


const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'login', component: LoginComponent },
          { path: 'product', component: ManageProductComponent },
          { path: 'product-add', component: AddProductComponent },
          { path: 'product-detail/:id', component: DetailProductComponent },
          { path: '', component: DashboardComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
