import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmemberComponent } from './smember.component';
import { SmemberRoutingModule, } from "./smember-routing.module";
import { SmemberOrderComponent } from './page/smember-order/smember-order.component';
import { SmemberHomeComponent } from './page/smember-home/smember-home.component';
import { UserOrderComponent } from './page/user-order/user-order.component';


@NgModule({
  declarations: [
    SmemberComponent,
    SmemberOrderComponent,
    SmemberHomeComponent,
    UserOrderComponent,
  ],
  imports: [
    CommonModule,
    SmemberRoutingModule
  ]
})
export class SmemberModule { }
