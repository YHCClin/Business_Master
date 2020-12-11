import { StartAppGuard } from './core/start-app.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./routes/guide/guide.module').then( m => m.GuidePageModule),
    canActivate: [StartAppGuard]
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'passport',
    loadChildren: () => import('./routes/passport/passport.module').then( m => m.PassportModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./routes/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'me',
    loadChildren: () => import('./routes/me/me.module').then( m => m.MePageModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./routes/product/product.module').then( p => p.ProductModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
