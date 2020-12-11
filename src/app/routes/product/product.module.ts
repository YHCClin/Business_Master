import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { CategoryListPage } from './category/category-list/category-list.page';


@NgModule({
  declarations: [CategoryListPage],
  imports: [
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
