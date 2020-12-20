import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Supply } from '../supply';

@Component({
  selector: 'app-select-supplier',
  templateUrl: './select-supplier.page.html',
  styleUrls: ['./select-supplier.page.scss'],
})
export class SelectSupplierPage implements OnInit {

  suppliers: Supply[];
  isActive = false;
  activeSupplier: Supply = {
    name: '',
    phone: null
  };
  constructor(private modalController: ModalController, private productService: ProductService) {
    this.productService.getSuppliers().then((data) => {
      if (data.success) {
        this.suppliers = data.result;
      } else {
        console.log('读取本地供应商数据失败');
      }
    });
  }

   // 关闭模态窗口，并把分类名称传回给分类编辑页面
  dismiss(supplier?: Supply) {
    this.modalController.dismiss(this.activeSupplier);
  }

  /**
   * 返回参数
   */
  onSave() {
    this.dismiss(this.activeSupplier);
  }


  onClick(supplier: Supply) {
    this.activeSupplier = supplier;
    this.isActive = true;
  }
  ngOnInit() {
  }

}
