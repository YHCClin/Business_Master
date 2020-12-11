import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AjaxResult } from 'src/app/shared/class/ajax-result';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ActiveCategory } from './ActiveCategory';
import { Category } from './Category';
import { CATEGORIES } from './mock.category';

export const CATE_KEY = 'Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private localStorageService: LocalStorageService) { }
  categorySubject = new Subject<ActiveCategory>();
  setTmpCategory(cate: Category) {
    throw new Error('Method not implemented.');
  }
  // getAll 函数
  async getAll(): Promise<AjaxResult> {
    const categories  = this.localStorageService.get(CATE_KEY, CATEGORIES);
    this.localStorageService.set(CATE_KEY, categories);
    return new AjaxResult(true, categories);
  }

  watchCategory(): Observable<ActiveCategory> {
    return this.categorySubject.asObservable();
  }
  getAll2(): any {
    const categories  = this.localStorageService.get(CATE_KEY, CATEGORIES);
    console.log(categories);
    return {
      targetUrl: '',
      result: categories,
      success: true,
      error: null,
      unAuthorizedRequest: false
    };
  }
  new_a_Bigid(): any {
    const categories = this.localStorageService.get(CATE_KEY, CATEGORIES);
    return categories[categories.length - 1].id + 1;
  }
  new_a_smallid(p: Array<Category> , id: number ): any{
    if (p.length === 0) {return id * 100 + 1; }
    else {
      return p[p.length - 1].id + 1;
    }
  }
  isUniquesmallName(p: Category[]): boolean {
    for (let i = 0; i < p.length; i++) {
      for (let j = i + 1; j < p.length; j++) {
        if (p[i].name === p[j].name) { return false; }
      }
    }
    return true;
  }
  isUniquebigName(p: Category): boolean{
    const categories = this.localStorageService.get(CATE_KEY, CATEGORIES);

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < categories.length; i++) {
      if (p.name === String(categories.name)) {
        return false;
      }
    }
    return true;
  }
  insert(p: Category): any {
    const categories = this.localStorageService.get(CATE_KEY, CATEGORIES);
 // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < categories.length; i++) {
      if (p.name === String(categories.name)) {
        return {
          success: false,
          message: '大分类名称已存在',
        };
      }
    }
    if (!this.isUniquesmallName(p.children)){
      return {
        success: false,
        message: '小分类名称不能重复'
      };
    }
    categories.push(p); // 添加类别
    this.localStorageService.set(CATE_KEY, categories);
    return {
      success: true,
      message: ''
    };
  }
  get(id: number): Category{
    const categories = this.localStorageService.get(CATE_KEY, CATEGORIES);
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < categories.length; i++) {
      if (id === Number(categories[i].id)) {
        return  categories[i]  ;
      }
    }
    return null;
  }
  update(p: Category): any {
    if (!this.isUniquebigName(p)){
      return {
        success: false,
        message: '大分类名称已存在'
      };
    }
    if (!this.isUniquesmallName(p.children)){
      return {
        success: false,
        message: '小分类名称不能重复'
      };
    }
    const categories = this.localStorageService.get(CATE_KEY, CATEGORIES);
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < categories.length; i++) {
      if (p.id === Number(categories[i].id)) {
        categories[i] = p;
        this.localStorageService.set(CATE_KEY, categories);
        return {
          success: true,
          message: ''
        };
      }
    }
  }
  findCategoryIndexByName(name: string): number {
    const g = this.localStorageService.get('Category', CATEGORIES);
    for ( let i = 0; i < g.length; i++) {
      if (g[i].name === name) {
        return i;
      }
    }
    return -1;
  }
  findCategoryIndexOfChiledren(category: Category){
    if (category === null) {
      return false;
    }
    const tmp1 = this.localStorageService.get('Category', CATEGORIES);
    const index = this.findCategoryIndexByName(category.name);
    if (index === -1) {
      return false; // 未能找到索引
    }
    const chilrenIndex = tmp1[index].children.length + index * 10;
    return chilrenIndex;

  }
  findCategoryById(id: number): Category {
    const g = this.localStorageService.get('Category', CATEGORIES);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < g.length; i++ ) {
      if (g[i].id === id) {
        return g[i];
      }
    }
    return null;
  }
  deleteSubCategoryById(category: Category, id: number): boolean {
    if (category == null) {
      return false;
    }
    for (let i = 0; i < category.children.length; i++) {
      if (category.children[i].id === id) {
        const index = this.findCategoryIndexByName(category.name);
        const tmp = this.localStorageService.get('Category', CATEGORIES);
        tmp[index].children.splice(i, 1);
        this.localStorageService.set('Category', tmp);
        return true;
      }
    }
    return false;
  }
  deleteCategoryById(id: number): boolean {
    const cate = this.localStorageService.get('Category', CATEGORIES);
    for (let i = 0; i < cate.length; i++) {
      console.log('我要进去了');
      if (cate[i].id === id) {
        cate.splice(i, 1); // 删除分类
        this.localStorageService.set('Category', cate);
        console.log('删除大类成功');
        return true;
      }
    }
    return false;
  }
}
