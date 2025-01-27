import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonItemSliding, ModalController } from '@ionic/angular';
import { Category } from '../Category';
import { CategoryNameEditPage } from '../category-name-edit/category-name-edit.page';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.page.html',
  styleUrls: ['./category-edit.page.scss'],
})
export class CategoryEditPage implements OnInit {

  @ViewChild('BigitemSliding', {static: true}) BigitemSliding: IonItemSliding;
  @ViewChild('SmallitemSliding', {static: true}) SmallitemSliding: IonItemSliding;
  public id = 0;
  category: Category;
  constructor(private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService,
              private modalController: ModalController,
              private alertController: AlertController,
              private router: Router) {
      activatedRoute.queryParams.subscribe(queryParams => {
        this.id = Number(queryParams.id);
        this.category = this.categoryService.get(this.id);
    });
  }

  ngOnInit() {
  }

  // 自定义弹出框
  private async presentModal(name: string) {
    const modal = await this.modalController.create({
      component: CategoryNameEditPage,
      componentProps: { value: name }
    });
    await modal.present();
    return modal.onWillDismiss();
  }

  /**
   * 编辑大类名称
   * @param item
   */
  async onEditCategoryName(item: IonItemSliding) {
    item.close();
    const {data} = await this.presentModal(this.category.name);
    if (data) {
      this.category.name = String(data);
      this.categoryService.update(this.category);
    }
  }
  /**
   * 编辑小类名称
   * @param item
   * @param subCategory
   */
  async onEditSubCategoryName(item: IonItemSliding, subCategory: Category) {
    item.close();
    const {data} = await this.presentModal(subCategory.name);
    if (data) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.category.children.length; i++) {
        if ( Number( subCategory.id) === this.category.children[i].id) {
          this.category.children[i].name = String(data);
          break;
        }
      }
      this.categoryService.update(this.category);
    }
  }
  /**
   * 删除（大/小）类别
   * @param item
   * @param subId
   */
  async onDelete(item: IonItemSliding, subId?: number) {
    item.close();
    console.log('asds' + subId);
    const alert = await this.alertController.create({
      header: '你确认要删除吗!',
      message: '请先删除该类别下的所有商品记录',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '确认',
          handler: () => {
            if (subId != null && this.category.children.length !== 0) { // 删除商品子分类
              console.log('删除子分类中');
              item.close();
              const res = this.categoryService.deleteSubCategoryById(this.category, subId);
              if (res) {
                console.log('删除成功');
              }
              this.category = this.categoryService.findCategoryById(this.id);
            } else if (this.category.children.length === 0) { // 删除商品分类
              item.close();
              this.categoryService.deleteCategoryById(this.category.id);
              this.router.navigateByUrl('/product/category/list');
            } else {
              item.close();
            }
          }
        }
      ]
    });
    await alert.present();
  }

}
