import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from '../../services/data/sessionStorage.service';
import { SharedService } from '../../services/data/shared.service';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    '../../../assets/public/css/style.css',
    '../../../assets/public/css/heart.css',
    '../../../assets/public/css/reponsive.css'
  ]
})
export class HeaderComponent {
  user: any;
  data: any;
  name?: string;
  lengthCart: any;
  productsFilter: any[] = [];
  products: any[] = [];
  filterValue: string = '';

  constructor(
    private sharedService: SharedService,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private sessionStorageService: SessionStorageService
  ) { }

  ngOnInit() {
    this.dataService.getData().subscribe(response => {
      this.data = response;
      this.products = this.data.products;
      // console.log(this.products);
      // console.log(this.productsFilter);
    });

    const allUrl = window.location.href;
    const result = allUrl.split('/').reverse()[1];

    if (result !== "smember") {
      const btnPopup = document.querySelector('#btn_popup');
      btnPopup?.addEventListener('click', (e) => {
        this.btn_popup();
      });
    }

    const userJson = localStorage.getItem('user');
    this.sharedService.currentLengthCart.subscribe(lengthCart => this.lengthCart = lengthCart);

    if (userJson) {
      this.user = JSON.parse(userJson);
      (document.querySelector('#btn_login') as HTMLElement).style.display = 'none';
      (document.querySelector('#poupUser') as HTMLElement).style.display = 'block';
      const getName = this.user.name.split(' ').slice(-2);
      this.name = `${getName[0]} ${getName[1]}`;
    }

    (document.querySelector('#inputFilter') as HTMLInputElement).addEventListener('focus', () => {
      (document.querySelector('.popupFilter') as HTMLElement).classList.toggle('hidden');
    });
    
  }

  btn_popup() {
    (document.querySelector("#popup_user") as HTMLElement).classList.toggle("hidden");
  }

  filter() {
    this.productsFilter = this.products
      .filter((p: any) => p.name.toLowerCase().includes(this.filterValue.toLowerCase()))
      .slice(0, 5);
  }

  hrefSmember() {
    if (this.user) {
      location.href = "/smember/home";
    } else {
      location.href = "";
    }
  }
}
