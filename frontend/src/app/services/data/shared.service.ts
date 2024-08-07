import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private lengthCartSource = new BehaviorSubject<number>(0);
  currentLengthCart = this.lengthCartSource.asObservable();

  constructor() { }

  updateLengthCart(length: number) {
    this.lengthCartSource.next(length);
  }
}
