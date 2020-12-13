import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Category } from '../Category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.page.html',
  styleUrls: ['./category-add.page.scss'],
})
export class CategoryAddPage implements OnInit {

  public isSmall = 0;
  public id = 0;
  public category: Category;
  public children: Array<Category> = [ ];

  constructor(private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService,
              private alertController: AlertController,
              private router: Router) {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.isSmall =  Number(queryParams.isSmall) ;
      this.id = Number(queryParams.id);
      if (this.isSmall === 1 ){ // 新增小分类
        this.category = this.categoryService.get(this.id);
        this.children.push( {
          id: this.categoryService.newSmallId(this.category.children, this.category.id),
          name: '',
          children: []
        });
      } else {  // 新增大分类
        this.category = {
          id: this.categoryService.newBigId(),
          name: '',
          children: []
        };
        this.children.push( {
          id: this.categoryService.newSmallId(this.children, this.category.id),
          name: '',
          children: []
        });
      }

    });
  }

  ngOnInit() {

  }

  // 新增小分类
  onAddSubCategory(){
    this.children.push( {
      id: this.categoryService.newSmallId(this.children, this.category.id),
      name: '',
      children: []
    });
  }

  onSave(){
    if (this.isSmall === 0){
      this.category.children = this.children;
      const result = this.categoryService.insert(this.category);
      if (result.success){
        this.router.navigateByUrl('/product/category/list');
      }else {
        this.alertController.create({
          header: '警告',
          buttons: ['确定']
        }).then((alert) => {
          alert.message = result.message;
          alert.present();
        });
      }
    } else {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.children.length; i++) {
        this.category.children.push(this.children[i]);
      }
      const result = this.categoryService.update(this.category);
      if (result.success){
        this.router.navigateByUrl('/product/category/list');
      }else {
        this.alertController.create({
          header: '警告',
          buttons: ['确定']
        }).then((alert) => {
          alert.message = result.message;
          alert.present();
        });
      }
    }
  }
}
