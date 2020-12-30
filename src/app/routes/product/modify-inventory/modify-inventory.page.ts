import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-modify-inventory',
  templateUrl: './modify-inventory.page.html',
  styleUrls: ['./modify-inventory.page.scss'],
})
export class ModifyInventoryPage implements OnInit {

  inOrOut: string;
  product: Product = {
    id: '',
    name: '',
    categoryId: 0,
    categoryName: '',
    category: '',
    barcode: '',
    images: [],
    price: 0,
    purchasePrice: 0,
    inventory: 0,
    standard: '',
    remark: '',
    supplierName: '',
    supplierPhone: ''
  };
  num: number;
  infor = {
    putInInventory: '入库数量',
    getOutInventory: '出库数量'
  };
  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private navCtrl: NavController, private router: Router,
              private localStorage: LocalStorageService) {
  }
  async ionViewDidEnter() {
    this.activatedRoute.queryParams.subscribe(async queryParams => {
      const barcode = queryParams.barcode;
      this.product = (await this.productService.getProductByBarcode(barcode)).result;
    });
    this.inOrOut = 'putInInventory';
  }

  /**
   * 点击确定，进行数量验证，若不符返回友好信息
   */
  async onClick() {
    if (this.num <= 0) {
      const alert = await this.alertCtrl.create({
        header: '提示',
        message: '输入值必须大于零',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    if (this.inOrOut == 'putInInventory') {
      this.product.inventory += this.num;
    } else {
      if (this.product.inventory - this.num < 0) {
        const alert = await this.alertCtrl.create({
          header: '提示',
          message: '出库数量不能大于库存',
          buttons: ['OK']
        });
        await alert.present();
        return ;
      } else {
        this.product.inventory -= this.num;
      }
    }
    const res = (await this.productService.modifyProduct(this.product)).success;
    if (res) {
      console.log('保存成功');
      this.navCtrl.navigateForward('/product/product-detail?barcode=' + this.product.barcode);
      const toast = await this.toastCtrl.create({
        message: '保存成功',
        duration: 2000,
      });
      await toast.present();
    } else {
      console.log('保存失败');
      const alert = await this.alertCtrl.create({
        header: '提示',
        message: '出现未知错误',
        buttons: ['OK']
      });
      await alert.present();
    }
    this.modifyLogUpdate(this.inOrOut, this.num, res);
    console.log('添加至日志');
  }

  /**
   * 查看出入库记录
   */
  showLog() {
    this.navCtrl.navigateForward('/product/log');
  }
  /**
   * 修改日志
   */
  async modifyLogUpdate(statu: string, num: number, res: boolean) {
    statu = statu == 'putInInventory' ? '入库数量' : '出库数量';
    const log = this.localStorage.get('modifyLog', []);
    const time = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
    const message = time + ';' + statu + ';' + num + ';' + '修改成功:' + res;
    log.unshift(message);
    this.localStorage.set('modifyLog', log);
  }
  ngOnInit() {
  }
}
