import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [ // 导出
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class SharedModule { }
