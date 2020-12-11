import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Category } from 'src/app/routes/product/category/Category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.page.html',
  styleUrls: ['./category-list.page.scss'],
})
export class CategoryListPage implements OnInit {

  categories: Array<Category> = [];
  activeCategory: Category = { id: 0, name: '', children: [] };
  activeSubCategoryes: Array<Category> = [];
  activeSubCategory: Category;

  constructor(private categoryService: CategoryService,
              private actionSheetController: ActionSheetController,
              private router: Router) {
    this.categoryService.getAll().then((data) => {
      this.categories =  data.result;
      if (this.categories){
        this.activeCategory = this.categories[0];
        this.activeSubCategoryes = this.activeCategory.children;
      }
    });
  }

  ngOnInit() {
  }
  daterefresh(){
    this.categoryService.getAll().then(  (data) => {
      this.categories =  data.result;
      if (this.categories){
        this.activeCategory = this.categories[0];
        this.activeSubCategoryes = this.activeCategory.children;
      }
    });
  }
  ionViewDidEnter(){
    this.daterefresh();
  }

  onSelectCategory(id: number) {
    this.activeCategory = this.categories[id - 1];
    this.activeSubCategoryes = this.activeCategory.children;
  }
  onSelectSubCategory() { }

  async onPresentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: '选择您的操作',
      buttons: [
        {
          text: '新增小分类',
          role: 'destructive',
          handler: () => {
            this.router.navigate(['product/category/add'], {queryParams: {id: this.activeCategory.id}});
            console.log('Destructive clicked');
          }
        }, {
          text: '编辑分类',
          handler: () => {
            this.router.navigate(['product/category/edit'] , {queryParams: {id: this.activeCategory.id}}  );
            console.log('Archive clicked');
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
  gotoAddCategory() {
    this.router.navigateByUrl('product/category/add');
  }
  getItemColor(id: number) {
    if (id === this.activeCategory.id) {
      return '';
    } else {
      return 'light';
    }
  }

}
