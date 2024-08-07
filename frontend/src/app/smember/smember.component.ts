import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './smember.component.html',
  styleUrls: ['../../assets/public/css/remember.css']
})
export class SmemberComponent {
  ngOnInit() {
    (document.querySelector('footer') as HTMLElement).style.display = 'none';
    var allUrl = window.location.href;
    var result = window.location.href.split('/').reverse()[0];

    if (result == "home") {
      (document.querySelector('#smb_home') as HTMLElement).classList.add('active');
    }
    else if (result == "order") {
      (document.querySelector('#smb_order') as HTMLElement).classList.add('active');
    }
    else if (result == "warranty") {
      (document.querySelector('#smb_warranty') as HTMLElement).classList.add('active');
    }
    else if (result == "gif") {
      (document.querySelector('#smb_gif') as HTMLElement).classList.add('active');
    }
    else if (result == "user") {
      (document.querySelector('#smb_user') as HTMLElement).classList.add('active');
    }
    else if (result == "feedback") {
      (document.querySelector('#smb_feedback') as HTMLElement).classList.add('active');
    }
  }
  btn_logout(){
    localStorage.removeItem('user');
    location.href="";
  }
} 
