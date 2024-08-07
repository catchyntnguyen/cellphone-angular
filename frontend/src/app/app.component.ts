import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/public/css/style.css',
    '../assets/public/css/heart.css',
    '../assets/public/css/reponsive.css'
  ]
})
export class AppComponent {
  [x: string]: any;
  ngOnInit() {
    this.hidden();
  }
  hidden() {
    var allUrl = window.location.href;
    var result = window.location.href.split('/').reverse()[0];
    let userFooter = document.querySelector('footer') as HTMLElement;
    if (allUrl.includes('/login') || allUrl.includes('/register'))   {
      userFooter.classList.add('hidden');
      // console.log(userFooter);
    }
    if(allUrl.includes('/smember')){
      const userJson = localStorage.getItem('user');
      if (!userJson) {
        location.href = '';
      }
    }
  }
}

