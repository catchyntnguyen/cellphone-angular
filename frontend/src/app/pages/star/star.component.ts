import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent {
  @Input() data: any;

  onClick(star: any) {
    const mes = "Sản phảm này được đánh giá ";
    // alert(mes + star + " sao");
  }
  tang() {
    let number = Number(this.data);
    number ++
    this.data = number;
    console.log(Number(this.data));
  }
}