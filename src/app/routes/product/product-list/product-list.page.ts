import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AjaxResult } from 'src/app/shared/class/ajax-result';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {

  currentIndex: number; // 当前页码，显示哪一页的商品数据
  products: Product[]; // 存放商品数据
  total: number; // 商品总记录数
  inventory: number; // 总正库存
  price: number;
  queryTerm: string; // 查询条件
  categoryId: number; // 类别编号用于保存用户选择的类别，初始值威-1
  flag = false;
  constructor(private activatedRoute: ActivatedRoute,
              private loadingController: LoadingController,
              private toastCtrl: ToastController,
              private productService: ProductService,
              private router: Router) {
                this.activatedRoute.queryParams.subscribe(queryParams => {
                  if (queryParams.flag) {
                    this.categoryId = Number(queryParams.subCategory);
                    this.flag = true;
                    console.log('所选类别: ' + this.categoryId);
                  }
                });
  }

  gotoCategory() {
    this.router.navigateByUrl('/product/category/list');
  }

  async ngOnInit() {
    // 自行添加初始化代码
    console.log('初始化');
    this.inventory = 0;
    this.total = 0;
    console.log('chulaile');
    const loading = await this.loadingController.create({
      message: '正在加载数据，请稍候...',
      spinner: 'bubbles',
    });
    this.price = 0;
    loading.present();
    try {
      let ajaxResult: AjaxResult;
      if (this.flag) {
        ajaxResult = await this.productService.getListByCategoryId(this.currentIndex, 7, this.categoryId);
      } else {
        ajaxResult = await this.productService.getList(this.currentIndex, 7);
      }
      console.log('有商品: ' + ajaxResult.result.length);
      this.total = (await this.productService.totalNumberOfGoods()).result;
      this.products = ajaxResult.result;
      for (const item of ajaxResult.result) {
        this.price += item.price * item.inventory;
        this.inventory += item.inventory;
      }
      loading.dismiss();
      // 其他代码省略
    } catch (error) {
      console.log(error);
      // 实际开发中应记录在日志文件中
    }
  }

  async ionViewDidEnter() {
    console.log('刷新了');
    // this.categoryId = -1;
    this.currentIndex = 1;
    this.productService.totalNumberOfGoods().then((data) => {
      this.total = data.result;
    });
    this.inventory = 0;
    this.price = 0;
    let ajaxResult: AjaxResult;
    if (this.flag){
      ajaxResult = await this.productService.getListByCategoryId(this.currentIndex, 7, this.categoryId);
    } else {
      ajaxResult = await this.productService.getList(this.currentIndex, 7);
    }
    this.products = ajaxResult.result;
    console.log(this.products.length);
    for (const product of this.products) {
      this.inventory += product.inventory;
      this.price += product.purchasePrice * product.inventory;
    }
  }

  async onRefresh(event) {
    this.currentIndex = 1;
    const refresh = event.target;
    try {
      this.inventory = 0;
      this.price = 0;
      let ajaxResult: AjaxResult;
      if (this.flag){
        ajaxResult = await this.productService.getListByCategoryId(this.currentIndex, 7, this.categoryId);
      } else {
        ajaxResult = await this.productService.getList(this.currentIndex, 7);
      }

      this.products = ajaxResult.result;
      for (const product of this.products) {
        this.inventory += product.inventory;
        this.price += product.purchasePrice;
      }
    } catch (error) {
      console.log('出现错误, 刷新失败');
      console.log(error);
    }
    event.target.complete();
  }

  async onInfinite(event) {
    const infiniteScroll = event.target;
    this.currentIndex++; // 滑动加载下一页
    let ajaxResult: AjaxResult;
    if (this.flag){
      ajaxResult = await this.productService.getListByCategoryId(this.currentIndex, 7, this.categoryId);
    } else {
      ajaxResult = await this.productService.getList(this.currentIndex, 7);
      console.log('加载下一页');
    }
    if (this.total - (this.currentIndex - 1) * 7 <= 0) {
      const toast = await this.toastCtrl.create({
        message: '已是最后一页',
        duration: 3000
      });
      toast.present();
    } else {
      this.inventory = 0;
      this.price = 0;
      this.products = this.products.concat(ajaxResult.result);
      for (const product of this.products) {
        this.inventory += product.inventory;
        this.price += product.purchasePrice * product.inventory;
      }
    }
    event.target.complete();
  }

  async onInput(event) {
    this.currentIndex = 1;
    const condition = event.target.value;
    try {
      if (condition === '') {
        this.ionViewDidEnter();
    } else {
        this.categoryId = -1;
        this.currentIndex = 1;
        this.inventory = 0;
        this.price = 0;
        let ajaxResult: AjaxResult;
        ajaxResult = await this.productService.getListByCondition(this.currentIndex, 7, condition);
        this.products = ajaxResult.result;
        for (const product of this.products) {
          this.inventory += product.inventory;
          this.price += product.price * product.inventory;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

}
