import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../../assets/public/css/register.css']
})
export class RegisterComponent {
  productForm: FormGroup;
  data:any;
  users: any
  constructor(private fb: FormBuilder, private dataService: DataService) { 
    this.productForm = this.fb.group({
      name: [''],
      phone: [''],
      email: [''],
      password: [''],
      passwordagain: [''],
    });
  }

  submitForm() {
    this.dataService.getData().subscribe(response => {
      this.data = response;
      this.users = this.data.users;
  
    const fromData = this.productForm.value;
    if (fromData) {
      let check = true;
      if (fromData.phone.length == "") {
        (document.getElementById("errorPhone") as HTMLElement).innerHTML = "Không để trống số điện thoại";
        check = false;
      } else if (fromData.phone.length != 10) {
        (document.getElementById("errorPhone") as HTMLElement).innerHTML = "Số điện thoại chưa đúng";
        check = false;
      } else {
        (document.getElementById("errorPhone") as HTMLElement).innerHTML = "";
      }
      if (fromData.name == "") {
        (document.getElementById("errorUser") as HTMLElement).innerHTML = "Không để trống tên của bạn";
        check = false;
      } else if (fromData.name != "") {
        (document.getElementById("errorUser") as HTMLElement).innerHTML = "";
      } 
      if (fromData.email == "") {
        (document.getElementById("errorEmail") as HTMLElement).innerHTML = "Không để trống Email của bạn";
        check = false;
      } else if (fromData.email != "") {
        if(!this.users.some((user: any) => user.email == fromData.email)){
          (document.getElementById("errorEmail") as HTMLElement).innerHTML = "";
        }else{
          (document.getElementById("errorEmail") as HTMLElement).innerHTML = "Email đã tồn tại";
          check = false;
        }
      } 
      if (fromData.password == "") {
        (document.getElementById("errorPass") as HTMLElement).innerHTML = "Không để trống mật khẩu của bạn";
        check = false;
      } else if (fromData.password != "") {
        (document.getElementById("errorPass") as HTMLElement).innerHTML = "";
      } 
      if (fromData.passwordagain == "") {
        (document.getElementById("errorPassA") as HTMLElement).innerHTML = "Nhập lại mật khẩu của bạn";
        check = false;
      } else if (fromData.passwordagain != "") {
        (document.getElementById("errorPassA") as HTMLElement).innerHTML = "";
        if (fromData.password !== fromData.passwordagain) {
          (document.getElementById("errorPassA") as HTMLElement).innerHTML = "Mật khẩu nhật lại chưa đúng";
        }
      } 
       if(check){
         this.dataService.registerHandler(fromData).subscribe();
         setTimeout( () => {
           location.href = "/login";
         },1000);
      }
    }
  });
  }
}
