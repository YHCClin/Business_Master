import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // 根模块，申明后不用去主模块注册
})
export class LocalStorageService {
  private LocalStorage = window.localStorage; // window 对象
  constructor() { }

  get(key: any, defaultValue?: any): any {
    // 这里判断一下输入，抛出相应异常
    try {
      if ( key === null) {  throw new Error('key 值不能为空'); }
    } catch (error) {
      console.log(error);
      return;
    }
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
