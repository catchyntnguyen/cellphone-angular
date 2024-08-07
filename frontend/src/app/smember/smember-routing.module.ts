import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 import { SmemberComponent } from './smember.component';
 import { SmemberOrderComponent } from './page/smember-order/smember-order.component'
 import { SmemberHomeComponent } from './page/smember-home/smember-home.component';
 import { UserOrderComponent } from './page/user-order/user-order.component';

const routes: Routes = [
  {
    path: 'smember',
    component: SmemberComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'home', component: SmemberHomeComponent },
          { path: 'order/:filter', component: SmemberOrderComponent },
          { path: 'orderDetail/:id', component: UserOrderComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmemberRoutingModule { }
