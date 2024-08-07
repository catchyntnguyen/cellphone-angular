import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data/data.service';
import { SessionStorageService } from '../../services/data/sessionStorage.service';
import { SharedService } from '../../services/data/shared.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['../../../assets/public/css/category.css',
    '../../../assets/public/css/heart.css',
    '../../../assets/public/css/reponsive.css']
})
export class CategoriesComponent {
  data: any;
  products: any;
  productsWithCategory: any;
  showData: any;
  cate: any
  brandmain: any = "all"
  arrayBrand: any
  lengthCart: any;
  constructor(private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private sessionStorageService: SessionStorageService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.dataService.getData().subscribe(response => {
      this.data = response;
      this.products = this.data.products;
      this.arrayBrand = this.data.categories_brand;

      this.route.params.subscribe(params => {
        let category = params['category'];
        this.cate = category;
        let brand = Number(params['brand']);

        // console.log('Category:', category);
        // console.log('Brand:', brand);

        if (brand === 0) {
          if (category === "dien-thoai") {
            this.productsWithCategory = this.products.filter((i: any) => i.categories === 1);
            this.showData = this.productsWithCategory;
          } else if (category === "laptop") {
            this.productsWithCategory = this.products.filter((i: any) => i.categories === 2);
            this.showData = this.productsWithCategory;
          }

        } else {
          if (category === "dien-thoai") {
            this.productsWithCategory = this.products.filter((i: any) => i.categories === 1 && i.brandId === brand);
            this.showData = this.productsWithCategory;
          } else if (category === "laptop") {
            this.productsWithCategory = this.products.filter((i: any) => i.categories === 2 && i.brandId === brand);
            this.showData = this.productsWithCategory;
          }
          this.brandmain = this.data.categories_brand.find((i: any) => i.id == brand);
          console.log(brand);
        }
      });
    });
    document.querySelectorAll('.cateFilter').forEach((item) => item.addEventListener("click", () => {
      document.querySelectorAll('.filter_sort_active').forEach((i: any) => {
        i.classList.remove("filter_sort_active");
      })
      item.classList.add("filter_sort_active")
    }))
  }
  filtersortdown(){
    this.showData = this.sortProductsdown(this.showData);
  }
  filtersortup(){
    this.showData = this.sortProductsup(this.showData);
  }
  sortProductsdown(products:any) {
    return products.sort((a: any, b: any) => b.priceNew - a.priceNew);
  }
  sortProductsup(products:any) {
    return products.sort((a: any, b: any) => a.priceNew - b.priceNew );
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