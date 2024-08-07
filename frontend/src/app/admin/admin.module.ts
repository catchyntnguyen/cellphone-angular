import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { ManageProductComponent } from './pages/manage-product/manage-product.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { DetailProductComponent } from './pages/detail-product/detail-product.component'


@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    AddProductComponent,
    ManageProductComponent,
    DetailProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ]
})
export class AdminModule { }
