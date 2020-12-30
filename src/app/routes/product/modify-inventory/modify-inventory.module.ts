import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifyInventoryPageRoutingModule } from './modify-inventory-routing.module';

import { ModifyInventoryPage } from './modify-inventory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifyInventoryPageRoutingModule
  ],
  declarations: [ModifyInventoryPage]
})
export class ModifyInventoryPageModule {}
