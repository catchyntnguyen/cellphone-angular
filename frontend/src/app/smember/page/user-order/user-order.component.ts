import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['../../../../assets/public/css/userOrder.css']
})
export class UserOrderComponent {
  data: any;
  orders: any;
  orderDetails: any;
  product: any;
  user: any;
  userName: any;
  userPhone: any;
  userAddress: any;
  reciverName: any;
  reciverPhone: any;
  reciverAddress: any;
  orderdetail: any;
  orderdetaildetail: any;
  totalAmount: any;
  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) { 
  }
  ngOnInit(): void {
    this.dataService.getData().subscribe(response => {
      this.data = response;
      this.orders = this.data.orders;
      this.orderdetail = this.data.orderdetail;
      // console.log(this.orderdetail);
      const userJson = localStorage.getItem('user');
      if (userJson) {
        this.user = JSON.parse(userJson);
        this.userName = this.user.name;
        this.userPhone = this.user.phone;
        this.userAddress = this.user.address;
      }
      this.route.params.subscribe(params => {
        let idOrder = params['id'];
        this.orderDetails = this.orders.filter((i: any) => i.id == idOrder);
        // console.log(this.orderDetails);
        this.reciverName = this.orderDetails[0].receiverName;
        this.reciverPhone = this.orderDetails[0].receiverPhone;
        this.reciverAddress = this.orderDetails[0].receiverAddress;
        this.orderdetaildetail = this.orderdetail.filter((i: any) => i.idOrder == idOrder);
        if(this.orderDetails[0].status == 0){
          (document.getElementById('Btn_cancel') as HTMLButtonElement).classList.remove('hidden');
        } 
      })
      this.totalAmount = 0;
      for (let i of this.orderdetaildetail) {
        this.totalAmount += this.thue(i.price) + i.price;
      }
    }
    )
  }
  nameProduct(id: any) {
    this.product = this.data.products.find((p: any) => p.id == id);
    return this.product
  }
  thue(value: any) {
    let thue = 10 * value / 100;
    return thue;
  }
  formatPrice(price: number): string {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }
  Btn_cancel(id: any) {
    let orderData = {
      id: id,
    };
    this.dataService.updataStatus(orderData).subscribe();
    setTimeout(() => {
      location.href = '/smember/order/all';
    })
  }
  
}
