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
      },
  {
    path: 'add-product',
    loadChildren: () => import('./add-product/add-product.module').then( m => m.AddProductPageModule)
  },
  {
    path: 'select-supplier',
    loadChildren: () => import('./select-supplier/select-supplier.module').then( m => m.SelectSupplierPageModule)
  },
  {
    path: 'product-list',
    loadChildren: () => import('./product-list/product-list.module').then( m => m.ProductListPageModule)
  },
  {
    path: 'product-detail',
    loadChildren: () => import('./product-detail/product-detail.module').then( m => m.ProductDetailPageModule)
  },
  {
    path: 'popover',
    loadChildren: () => import('./popover/popover.module').then( m => m.PopoverPageModule)
  },
  {
    path: 'modify-inventory',
    loadChildren: () => import('./modify-inventory/modify-inventory.module').then( m => m.ModifyInventoryPageModule)
  },
  {
    path: 'log',
    loadChildren: () => import('./log/log.module').then( m => m.LogPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
