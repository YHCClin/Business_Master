import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private localStorage: LocalStorageService) { }
  user: any;
  appConfig: any;
  load(): any {
    this.user = this.localStorage.get('user', null);
    return this.user;
  }

  saveInfo(property: string, value: string){
    const account = this.load();
    const accounts = this.localStorage.get('TUser', []);
    const uid = account.uid;
    if (account !== null) {
      // 执行修改
      account.shopInfo[property] = value;
      let idx = 0;
      for (idx = 0; idx < accounts.length; idx++) {
        if (accounts[idx].uid === uid) {
          break;
        }
      }
      accounts.splice(idx, 1);
      accounts.push(account);
      this.user = account;
      this.localStorage.set('user', account);
      this.localStorage.set('TUser', accounts);
    }
  }
}
