import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { SessionStorageService } from '../../services/data/sessionStorage.service';
import { SharedService } from '../../services/data/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../../assets/public/css/style.css',
    '../../../assets/public/css/heart.css',
    '../../../assets/public/css/reponsive.css'
  ]

})
export class HomeComponent implements OnInit {
  data: any;
  products: any;
  productsHot: any;
  productsNew: any;
  laptops: any;
  brand: any;
  brandPhone: any;
  brandlaptop: any;
  lengthCart: any;
  constructor(private dataService: DataService, private router: Router, private sessionStorageService: SessionStorageService, private sharedService: SharedService) { }
  ngOnInit() {
    this.dataService.getData().subscribe(response => {
      this.data = response;
      this.products = this.data.products;
      this.brand = this.data.categories_brand;
      this.brandPhone = this.brand.filter((i: any) => i.categoryId == 1);
      this.brandlaptop = this.brand.filter((i: any) => i.categoryId == 2);
      this.productsHot = this.products.filter((i: any, index: any) => i.producthot == 1).slice(0, 10);
      this.productsNew = this.products.filter((i: any, index: any) => i.categories == 1).slice(0, 10);
      this.laptops = this.products.filter((i: any, index: any) => i.categories == 2).slice(0, 10);
    });
    // this.sessionStorageService.removeItem('userData');
  }
  formatPrice(price: number): string {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }
  btn_add(id: any) {
    let dataLocal = this.sessionStorageService.getItem('userData');
    let detailProduct = this.products.find((i: any) => i.id == id);
    detailProduct.soluong = 1
    if (!dataLocal) {
      this.sessionStorageService.setItem('userData', [detailProduct]);
    } else {
      let existingProduct = dataLocal.find((product: any) => product.id === id);
      if (existingProduct) {
        existingProduct.soluong += 1;
      } else {
        dataLocal.push(detailProduct);
      }
      this.sessionStorageService.setItem('userData', dataLocal);
    }
    this.lengthCart = dataLocal.length;
    this.sharedService.updateLengthCart(this.lengthCart);
  }
}
