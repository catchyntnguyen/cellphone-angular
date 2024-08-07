import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-smember-order',
  templateUrl: './smember-order.component.html',
  styleUrls: ['../../../../assets/public/css/remember.css']
})
export class SmemberOrderComponent implements OnInit {
  data: any;
  orders: any;
  orderDetails: any;
  orderDetailsLength: any;
  orderDetailsmain: any;
  user: any;
  userName: any;
  userPhone: any;
  filterOrder: any;
  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {

    this.dataService.getData().subscribe(response => {
      this.data = response;
      this.orders = this.data.orders;
      const userJson = localStorage.getItem('user');
      if (userJson) {
        this.user = JSON.parse(userJson);
        this.orderDetailsLength = this.orders.filter((i: any) => i.idUserBuy == this.user.id);
        this.orderDetailsmain = this.orders.filter((i: any) => i.idUserBuy == this.user.id);
        this.orderDetails = this.orders.filter((i: any) => i.idUserBuy == this.user.id);
        console.log(this.orderDetails);
        this.userName = this.user.name;
        this.userPhone = this.user.phone;
      }

    }
    )
    document.querySelectorAll('.filteChild').forEach((i: any) => i.addEventListener('click', () => {
      this.route.params.subscribe(params => {
        let filter = params['filter'];
        console.log(filter);
        if (filter == "all") {
          this.orderDetails = this.orderDetailsmain;
        } 
        else if (filter === "waiting") {
          this.orderDetails = this.orderDetailsmain.filter((i: any) => i.status == 0);
        }
        else if (filter === "Confirmed") {
          this.orderDetails = this.orderDetailsmain.filter((i: any) => i.status == 1);
        }
        else if (filter === "transport") {
          this.orderDetails = this.orderDetailsmain.filter((i: any) => i.status == 2);
        }
        else if (filter === "finish") {
          this.orderDetails = this.orderDetailsmain.filter((i: any) => i.status == 3);
        }
        else if (filter === "cancel") {
          this.orderDetails = this.orderDetailsmain.filter((i: any) => i.status == 4);
        }
      });
      document.querySelectorAll('.active_filter').forEach((item: any) => {
        item.classList.remove("active_filter");
      })
      i.classList.add('active_filter');
    }));
  }
  getStatusText(status: number): string {
    switch (status) {
      case 0:
        return 'Đang chờ';
      case 1:
        return 'Đóng gói';
      case 2:
        return 'Đang giao';
      case 3:
        return 'Thành công';
      case 4:
        return 'Đã hủy';
      default:
        return 'Không biết';
    }
  }
  formatPrice(price: number): string {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }
  formatDate(dateString: any) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
}
