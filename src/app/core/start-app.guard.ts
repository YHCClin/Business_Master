import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from './../shared/services/local-storage.service';

const APP_KEY = 'App';

@Injectable({
  providedIn: 'root'
})
export class StartAppGuard implements CanActivate {
  constructor(private localStorageService: LocalStorageService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // ngOnInit 中的代码

    const appConfig = this.localStorageService.get(APP_KEY, {
      version: '1.4.0',
      mobile: '18359135336',
      launched: false
    });
    if (appConfig.launched === false){
      appConfig.launched = true;
      this.localStorageService.set(APP_KEY, appConfig);
    } else {
      this.router.navigateByUrl('/passport/login');
    }
    const UserExpiredTime = this.localStorageService.get('expiredTime');
    if (Date.now() < UserExpiredTime) {
      this.router.navigateByUrl('/tabs/home');
      return true;
    } else {
      this.localStorageService.set('user', null);
    }
    return true;
  }
}
