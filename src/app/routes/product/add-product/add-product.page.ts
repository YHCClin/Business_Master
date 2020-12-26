import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { ActionSheetController, AlertController, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CategoryService } from '../category/category.service';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Supply } from '../supply';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { SelectSupplierPage } from '../select-supplier/select-supplier.page';
import { ActiveCategory } from '../category/ActiveCategory';




@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit, OnDestroy {

  subscription: Subscription;
  product: Product = new Product();

  constructor(private actionSheetCtrl: ActionSheetController,
              private productService: ProductService,
              private navCtrl: NavController,
              private camera: Camera,
              private categoryService: CategoryService,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController,
              private zone: NgZone,
              private barcodeScanner: BarcodeScanner,
              private imagePicker: ImagePicker,
              private router: Router,
              private actionSheetController: ActionSheetController) {
    this.product = this.initProduct();
    this.product.categoryName = '默认分类';
    this.product.supplierName = '输入商品供应商';
    // this.ionViewDidEnter();
    // 观察者
    this.subscription = categoryService.watchCategory().subscribe(
      (activeCategory: ActiveCategory) => {
        this.product.categoryName = activeCategory.name;
        this.product.category = activeCategory;
        this.product.categoryId = activeCategory.id;
      },
      (error: ActiveCategory) => {
        this.subscription.unsubscribe();
      }
    );

  }



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  async onPresentActiveSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: '选择您的操作',
      buttons: [
        {
          text: '拍照',
          role: 'destructive',
          handler: () => {
            console.log('进入相机');
            this.onCamera();
          }
        }, {
            text: '相册',
              handler: () => {
              console.log('进入相册');
              this.onImagePicker();
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }


  async onSave(ct: boolean = false) {
    this.productService.insert(this.product).then(async (data) => {
      if (data.success) {
        const alert = await this.alertCtrl.create({
          header: '提示',
          message: '添加成功',
          buttons: ['确定']
        });
        alert.present();
        if (ct) {
          this.product = this.initProduct();
          this.product.categoryName = '默认分类';
          this.product.supplierName = '输入商品供应商';
        } else {
          this.initProduct();
          this.router.navigateByUrl('/tabs/home');
        }
      } else {
        const alert = await this.alertCtrl.create({
          header: '提示',
          message: '添加失败',
          buttons: ['确定']
        });
        alert.present();
      }
    });
  }

  /**
   * 本地没有供应商数据，输入供应商
   */
  async presentAlertPrompt() {
    const alert = await this.alertCtrl.create({
      header: '新增供货商',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: '输入供货商名称'
        },
        {
          name: 'phone',
          type: 'number',
          placeholder: '输入供货商电话'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: '保存',
          handler: (data) => {
            this.zone.run(() => {
              // 实现供应商存储到product中
              this.product.supplierName = data.name;
              this.product.supplierPhone = data.phone;
            });
            console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }


  /**
   * 点击现有供应商时，判断本地是否有供应商数据
   */
  async onClickSupplier() {
    const actionSheet = await this.actionSheetController.create({
      header: '选择您的操作',
      buttons: [
        {
          text: '现有供货商',
          role: 'destructive',
          handler: async () => {
            console.log('调用模态框');
            const {data} = await this.presentModal();
            if (data) {
              this.product.supplierName = data.name;
              this.product.supplierPhone = data.phone;
            }
          }
        }, {
          text: '新增供货商',
          handler: () => {
            this.presentAlertPrompt();
            console.log('New Supplier');
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  async onSupplier() {
    const supply = await (await this.productService.getSuppliers()).result;
    if (supply.length <= 0){
      this.presentAlertPrompt();
    } else {
        // 调用模态框
        console.log('调用模态框');
        const {data} = await this.presentModal();
        if (data) {
          this.product.supplierName = data.name;
          this.product.supplierPhone = data.phone;
        }
    }
  }

  private async presentModal() {
    const modal = await this.modalCtrl.create({
      component: SelectSupplierPage,
    });
    await modal.present();
    return modal.onWillDismiss();
  }

  /**
   * 扫描条码
   */
  onScan() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.product.barcode = barcodeData.text;
    }).catch(err => {
      console.log('Error', err);
    });
  }

  async Choose() {
    const actionSheet = await this.actionSheetController.create({
      header: '选择您的操作',
      buttons: [
        {
          text: '相册',
          role: 'destructive',
          handler: () => {
            this.onImagePicker();
            console.log('by ImagePicker');
          }
        }, {
          text: '拍照',
          handler: () => {
            this.onCamera();
            console.log('by Camera');
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  /**
   * 拍照
   */
  onCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      this.product.images.push(base64Image);
    }, (err) => {
      console.log(err);
    });
  }

  ionViewDidEnter(){
    console.log('进入页面');
  }

  /**
   * 从相册中选取
   */
  onImagePicker() {
    const options: CameraOptions = {
      quality: 10,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: 0
    };

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     const base64Image = 'data:image/jpeg;base64,' + imageData;
     this.product.images.push(base64Image);
    }, (err) => {
     // Handle error
    });
  }



  // onImagePicker() {
  //   const options: ImagePickerOptions = {
  //     maximumImagesCount: 4,
  //     quality: 100,
  //     outputType: 1
  //   };
  //   this.imagePicker.getPictures(options).then((results) => {
  //     // tslint:disable-next-line:prefer-for-of
  //     for (let i = 0; i < results.length; i++) {
  //       console.log('Image URI: ' + results[i]);
  //       this.product.images.push(results[i]);
  //     }
  //   }, (err) => {
  //     console.log('Error', err);
  //   });
  // }

  /**
   * 转跳到商品类别界面
   */

  goToCatList(){
    this.router.navigateByUrl('/product/category/list');
  }


  initProduct(): Product {
    // return new Product();
    return {
      id: '',
      name: '',
      categoryId: null,
      categoryName: '',
      category: null,
      barcode: '',
      images: [],
      price: null,
      purchasePrice: null,
      inventory: null,
      supplierName: null,
      supplierPhone: null,
      standard: '',
      remark: ''
    };
    // return {
    //   id: '',
    //   name: '',
    //   categoryId: null,
    //   categoryName: '',
    //   category: null,
    //   barcode: '',
    //   images: [],
    //   price: 0,
    //   purchasePrice: 0,
    //   inventory: 0,
    //   standard: '',
    //   remark: '',
    //   supplierName: '',
    //   supplierPhone: ''
    // };
  }
  ngOnInit() {
  }

}
