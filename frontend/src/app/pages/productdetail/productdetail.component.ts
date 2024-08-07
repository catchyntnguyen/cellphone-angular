import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data/data.service';
import { SessionStorageService } from '../../services/data/sessionStorage.service';
import { SharedService } from '../../services/data/shared.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['../../../assets/public/css/detail.css']
})
export class ProductdetailComponent {
  [x: string]: any;
  productDetail: any;
  data: any;
  products: any;
  productversions: any;
  lengthCart:any;
  constructor(private dataService: DataService, 
    private router: Router, 
    private route: ActivatedRoute,
    private sessionStorageService: SessionStorageService, 
    private sharedService: SharedService) { }

  ngOnInit() {
    this.dataService.getData().subscribe(response => {
      this.data = response;
      this.products = this.data.products;
      let id = this.route.snapshot.params['id'];
      this.productDetail = this.products.find((i: {
        id: any; productId: any;
      }) => i.id == id);
      this.productversions =  this.data.product_versions.filter( (i: any) => i.product_id == id );
    });
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
