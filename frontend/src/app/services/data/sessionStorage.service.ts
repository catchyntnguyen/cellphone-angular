
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  [x: string]: any;

  constructor() { }

  // Phương thức để lưu dữ liệu vào sessionStorage
  setItem(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  // Phương thức để lấy dữ liệu từ sessionStorage
  getItem(key: string): any {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  // Phương thức để xóa dữ liệu từ sessionStorage
  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }
}
