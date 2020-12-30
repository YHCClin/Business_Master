import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifyInventoryPage } from './modify-inventory.page';

const routes: Routes = [
  {
    path: '',
    component: ModifyInventoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifyInventoryPageRoutingModule {}
