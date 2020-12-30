import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController, NavController, PopoverController, ToastController } from '@ionic/angular';
import { PassportServiceService } from 'src/app/shared/services/passport-service.service';
import { PopoverPage } from '../popover/popover.page';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

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
  seePrice: boolean;
  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private popoverCtrl: PopoverController,
              private alertCtrl: AlertController,
              private userService: PassportServiceService,
              private toastCtrl: ToastController,
              private navCtrl: NavController,
              private actionSheetCtrl: ActionSheetController) {
    this.ionViewDidEnter();
  }

  /**
   * 进入页面时，初始化数据
   * 因为可能进行多次页面传递参数
   */
  ionViewDidEnter() {
    this.activatedRoute.queryParams.subscribe(async queryParams => {
      const barcode = queryParams.barcode;
      const p = (await this.productService.getProductByBarcode(barcode)).result;
      if (p !== null){
        this.product = p;
      }
    });
    this.seePrice = false;
  }
  /**
   * 离开页面时，隐藏价格
   */
  ionViewDidLeave() {
    this.seePrice = false;
  }
  ngOnInit() {  }
  /**
   * 显示下拉框
   */
  async onPresentPopover(event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event,
      componentProps: {barcode: this.product.barcode},
      translucent: false,
      backdropDismiss: true
    });
    await popover.present();
  }

  /**
   * 验证用户信息
   */
  async checkUser() {
    const alert = await this.alertCtrl.create({
      header: '请登录',
      inputs: [
        {
          name: 'account',
          type: 'text',
          placeholder: '请输入账户'
        },
        {
          name: 'password',
          type: 'text',
          placeholder: '请输入账密码'
        }
      ],
      buttons: [
        {
          text: '确定',
          handler: async (data) => {
            console.log('确定');
            const res = (await this.userService.login(data.account, data.password)).success;
            if (res === true) {
              console.log('验证成功');
              this.seePrice = true;
            } else {
              console.log('验证失败');
              const toast = await this.toastCtrl.create({
                message: '账号或密码错误',
                duration: 3000
              });
              await toast.present();
            }
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('cancel');
          }
        }
      ]
    });
    await alert.present();
  }
  goToModefyInventoryPage() {
  }
  async onPresentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: '分享',
      buttons: [{
        text: '微信',
        role: 'share',
        icon: 'logo-wechat',
        handler: () => {
          console.log('WeChat');
        }
      }, {
        text: 'QQ',
        role: 'share',
        icon: 'logo-tux',
        handler: () => {
          console.log('QQ');
        }
      }, {
          text: '取消',
          role: 'cancel',
        handler: () => {
            console.log('cancel');
        }
      }]
    });
    await actionSheet.present();
  }

}
