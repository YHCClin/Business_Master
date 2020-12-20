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
    suppliers.push(supplier);
    this.localStorageService.set('suppliers', suppliers);
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
}
