import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StarComponent } from './pages/star/star.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductdetailComponent } from './pages/productdetail/productdetail.component';
import { FooterComponent } from './component/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './src/app/admin/dashboard/dashboard.component';
import { ManageProductComponent } from './src/app/admin/manage-product/manage-product.component';
import { AdminModule } from './admin/admin.module';
import { SmemberModule } from './smember/smember.module';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './pages/register/register.component';
import { CartComponent } from './pages/cart/cart.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { NotificationComponent } from './pages/notification/notification.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StarComponent,
    HomeComponent,
    ProductdetailComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    ManageProductComponent,
    RegisterComponent,
    CartComponent,
    CategoriesComponent,
    NotificationComponent
    ],
  imports: [
    BrowserModule,
    AdminModule,
    SmemberModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {  }
