import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // 根模块，申明后不用去主模块注册
})
export class LocalStorageService {
  private LocalStorage = window.localStorage; // window 对象
  constructor() { }

  get(key: any, defaultValue?: any): any {
    // 这里判断一下输入，抛出相应异常
    let value = this.LocalStorage.getItem(key);
    try {
      value = JSON.parse(value);
    } catch (error) {
      value = null;
    }
    if (value === null && defaultValue) {// === 强制判断类型
      value = defaultValue;
    }
    return value;
  }

  insert(key: string, value: any){
    this.set(key, value);
  }

  set(key: any, value: any) {
    this.LocalStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string) {
    this.LocalStorage.removeItem(key);
  }
}
