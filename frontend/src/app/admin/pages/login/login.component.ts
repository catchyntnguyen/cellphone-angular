import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { users } from '../../../services/data/data';
import { Iuser } from '../../../models/entities/product';

@Component({
  selector: 'admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  [x: string]: any;
  users = users;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;
      let user = users.find(user => user.email === formValues.email)
      if(user){
        if(user.password == formValues.password){
          if(user.role == 1){
            location.href = 'admin/home'
          }else{
            location.href = '';
          }
        }else{
          alert('Mật Khẩu sai rồi !!')
        }
      }else{
        alert('Tài khoảng chưa đăng ký!!')
      }
    
    } else {
    }
  }
}
