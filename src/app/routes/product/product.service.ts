import { Injectable } from '@angular/core';
import { AjaxResult } from 'src/app/shared/class/ajax-result';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Product } from './product';
import {UUID} from 'angular2-uuid';
import { Supply } from './supply';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  async totalNumberOfGoods(): Promise<AjaxResult>{
    const products = await this.localStorageService.get('products', []);
    return new AjaxResult(true, products.length);
  }

  constructor(private localStorageService: LocalStorageService,
              private product: Product) { }


  // 添加商品
  async insert(input: Product): Promise<AjaxResult> {
    input.id = UUID.UUID();
    const products = await this.localStorageService.get('products', []);
    products.push(input);
    const supplier = new Supply();
    supplier.name = input.supplierName;
    supplier.phone = input.supplierPhone;
    const suppliers = this.localStorageService.get('suppliers', []);
    let flag = false;
    for ( const sup of suppliers ){
      if (sup.name == supplier.name){
        flag = true;
      }
    }
    if (!flag){
      suppliers.push(supplier);
      this.localStorageService.set('suppliers', suppliers);
    }
    this.localStorageService.set('products', products);
    return new AjaxResult(true, null);
  }

  // 得到供货商
  async getSuppliers(): Promise<AjaxResult>{
    const suppliers = await this.localStorageService.get('suppliers', []);
    if (suppliers.length === 0) {
      return new AjaxResult(false, [], {message: 'No suppliers', details: ''});
    } else {
      return new AjaxResult(true, suppliers);
    }
  }

  async insertSupplier(supplier: Supply): Promise<AjaxResult>{
    const suppliers = await this.localStorageService.get('suppliers', []);
    suppliers.push(supplier);
    this.localStorageService.set('suppliers', suppliers);
    return new AjaxResult(true, supplier);
  }

  async getList(index: number, size: number): Promise<AjaxResult> {
    if (index < 0) {
      // 实际开发中应抛出异常类对象
      throw new Error('分页的索引应大于等于零');
    }
    if (size <= 0) {
      // 实际开发中应抛出异常类对象
      throw new Error('每页显示的记录数应大于零');
    }
    let products = this.localStorageService.get('products', []);
    products = products.slice((index - 1) * size, index * size);
    // 其他代码省略
    return new AjaxResult(true, products);
  }

  async getListByCategoryId(index: number, size: number, categoryId: number): Promise<AjaxResult> {
    const products = this.localStorageService.get('products', []);
    // tslint:disable-next-line:prefer-const
    let result = [];
    if (products.length === 0){
      return new AjaxResult(false, null);
    } else {
      for (const product of products) {
        if (Number(product.categoryId) == categoryId){
          result.push(product);
          console.log('xuanzhe');
        }
      }
      const total = result.length;
      console.log('找到：' + total);
      result = result.slice((index - 1) * size, index * size);
      return new AjaxResult(true, result);
    }
  }

  async getListByCondition(index: number, size: number, input: any): Promise<AjaxResult> {
    const productlist = this.localStorageService.get('products', []);
    let tmp = [];
    for (const p of productlist) {
      if (this.fuzzyMatch(p.name, input) || this.fuzzyMatch(p.barcode, input) || this.fuzzyMatch(p.price, input)) {
        tmp.push(p);
      }
    }
    const total = tmp.length;
    tmp = tmp.slice((index - 1) * size, index * size);
    return {
      targetUrl: '',
      result: tmp,
      success: true,
      error: null,
      unAuthorizedRequest: false,
    };
  }
  fuzzyMatch(str: string, key: string): boolean {
    if (str.toString().toLowerCase().indexOf(key) !== -1){
      return true;
    }
    return false;
  }
}
