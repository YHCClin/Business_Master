import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CopyrightComponent } from './components/copyright/copyright.component';



@NgModule({
  declarations: [
    CopyrightComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [ // 导出
    CommonModule,
    FormsModule,
    IonicModule,
    CopyrightComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
