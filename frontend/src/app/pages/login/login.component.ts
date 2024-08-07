import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../services/data/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../assets/public/css/login.css']
})
export class LoginComponent {
  [x: string]: any;
  data: any;
  users:any;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)])
  });
  constructor(private dataService: DataService, private router: Router) {}
  ngOnInit() {
    this.dataService.getData().subscribe(response => {
      this.data = response;
      this.users = this.data.users;
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;
      console.log(formValues);
      let user =  this.users.find((user:any) => user.email === formValues.email)
      if (user) {
        if (user.password == formValues.password) {
          if (user.role == 1) {
            location.href = '/admin';
            localStorage.setItem('user', JSON.stringify(user));
          } else {
            location.href = '';
            localStorage.setItem('user', JSON.stringify(user));
          }
        } else {
          // alert('Mật Khẩu sai rồi !!')
          (document.querySelector('#errorpass') as HTMLInputElement).style.display = "block";
        }
      } else {
        // alert('Tài khoảng chưa đăng ký!!');
        (document.querySelector('#erroruser') as HTMLInputElement).style.display = "block";
      }
      console.log(user)
    } else {
      console.log('Form is invalid');
    }
  }
}
