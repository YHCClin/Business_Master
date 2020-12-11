import { CategoryService } from './category/category.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListPage } from './category/category-list/category-list.page';

const routes: Routes = [
      {
        path: 'category',
        component: CategoryService
      },
      {
        path: 'category/list',
        component: CategoryListPage,
      },
      {
        path: 'category/add',
        loadChildren: () => import('./category/category-add/category-add.module').then( m => m.CategoryAddPageModule)
      },
      {
        path: 'category/edit',
        loadChildren: () => import('./category/category-edit/category-edit.module').then( m => m.CategoryEditPageModule)
      },
      {
        path: 'category/name-edit',
        loadChildren: () => import('./category/category-name-edit/category-name-edit.module').then( m => m.CategoryNameEditPageModule)
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
