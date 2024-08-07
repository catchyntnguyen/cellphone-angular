import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { SessionStorageService } from '../../services/data/sessionStorage.service';
import { SharedService } from '../../services/data/shared.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['../../../assets/public/css/basket.css']
})
export class CartComponent {
  checkOutForm: FormGroup;
  showData: any;
  dataLocal: any;
  lengthCart: any;
  constructor(private fb: FormBuilder, private sharedService: SharedService, private dataService: DataService, private router: Router, private sessionStorageService: SessionStorageService) {
    this.checkOutForm = this.fb.group({
      idUserBuy: [''],
      receiverName: [''],
      receiverEmail: [''],
      receiverPhone: [''],
      receiverAddress: [''],
      arrayProducts: [],
      totalProducts: []
    });
  }

  ngOnInit() {
    let userFooter = document.querySelector('footer') as HTMLElement;
    userFooter.classList.add('hidden');
    this.dataLocal = this.sessionStorageService.getItem('userData');
    this.lengthCart = this.dataLocal.length;
    this.sharedService.updateLengthCart(this.lengthCart);
    if (!this.dataLocal || this.dataLocal.length < 1) {
      (document.querySelector('#nobuy') as HTMLElement).style.display = 'block';
      (document.querySelector('#showcart') as HTMLElement).style.display = 'none';
      (document.querySelector('#nutthanhtoan') as HTMLElement).style.display = 'none';
    } else {
      (document.querySelector('#nobuy') as HTMLElement).style.display = 'none';
      (document.querySelector('#showcart') as HTMLElement).style.display = 'block';
      (document.querySelector('#nutthanhtoan') as HTMLElement).style.display = 'block';
      this.showData = this.dataLocal
    }

  }
  formatPrice(price: number): string {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }
  calculateTotal(): number {
    return this.showData.reduce((total: number, product: any) => {
      return total + (product.priceNew * product.soluong);
    }, 0);
  }
  increaseQuantity(index: number) {
    this.showData[index].soluong++;
    this.updateLocalStorage();
    this.lengthCart = this.dataLocal.length;
    this.sharedService.updateLengthCart(this.lengthCart);
  }

  decreaseQuantity(index: number) {
    this.showData[index].soluong--;
    if (this.showData[index].soluong < 1) {
      this.showData.splice(index, 1);
    }
    this.updateLocalStorage();
    this.lengthCart = this.dataLocal.length;
    this.sharedService.updateLengthCart(this.lengthCart);
    if (!this.dataLocal || this.dataLocal.length < 1) {
      (document.querySelector('#nobuy') as HTMLElement).style.display = 'block';
      (document.querySelector('#showcart') as HTMLElement).style.display = 'none';
      (document.querySelector('#nutthanhtoan') as HTMLElement).style.display = 'none';
    }
  }
  xoaProduct(index: number) {
    this.showData.splice(index, 1);
    this.updateLocalStorage();
    this.lengthCart = this.dataLocal.length;
    this.sharedService.updateLengthCart(this.lengthCart);
    if (!this.dataLocal || this.dataLocal.length < 1) {
      (document.querySelector('#nobuy') as HTMLElement).style.display = 'block';
      (document.querySelector('#showcart') as HTMLElement).style.display = 'none';
      (document.querySelector('#nutthanhtoan') as HTMLElement).style.display = 'none';
    }
  }
  updateLocalStorage() {
    this.sessionStorageService.setItem('userData', this.showData);
  }
  btn_popup() {
    (document.querySelector("#popupPay") as HTMLElement).classList.toggle("hidden");
  }
  popupPayHidden() {
    (document.querySelector("#popupPay") as HTMLElement).classList.add("hidden");
  }
  submitForm() {
    const fromData = this.checkOutForm.value;
    const userJson = localStorage.getItem('user');
    if (userJson) {
      let user = JSON.parse(userJson);
      if(fromData){
        let check = true;
        if (fromData.receiverName == "") {
          (document.getElementById("errorName") as HTMLElement).innerHTML = "Không để trống tên người nhận";
          check = false;
        } else if (fromData.receiverName != "") {
          (document.getElementById("errorName") as HTMLElement).innerHTML = "";
        } 
        if (fromData.receiverEmail == "") {
          (document.getElementById("errorEmail") as HTMLElement).innerHTML = "Không để trống email người nhận";
          check = false;
        } else if (fromData.receiverEmail != "") {
          (document.getElementById("errorEmail") as HTMLElement).innerHTML = "";
        } 
        if (fromData.receiverPhone == "") {
          (document.getElementById("errorPhone") as HTMLElement).innerHTML = "Không để trống số điện thoại người nhận";
          check = false;
        } else if (fromData.receiverPhone != "") {
          (document.getElementById("errorPhone") as HTMLElement).innerHTML = "";
        } 
        if (fromData.receiverAddress == "") {
          (document.getElementById("errorAddress") as HTMLElement).innerHTML = "Không để trống địa chỉ người nhận";
          check = false;
        } else if (fromData.receiverAddress != "") {
          (document.getElementById("errorAddress") as HTMLElement).innerHTML = "";
        } 
        if(check){
          if (this.dataLocal) {
            this.checkOutForm.patchValue({
              arrayProducts: this.dataLocal,
              idUserBuy: user.id,
              totalProducts: this.calculateTotal()
            });
            const productData = this.checkOutForm.value;
            this.dataService.checkOut(productData).subscribe();
            this.sessionStorageService.removeItem('userData');
            // location.href = "";
          }
        }else{
        }
      }
    }else{
        // alert("Bạn hãy đăng nhập trước đã");\
        this.router.navigate(['/login']);
    }
  }

}
