import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PassportServiceService {

  constructor(private localStorageService: LocalStorageService) { }
  UID = 0;
  addUser(phone: string, email: string, password: string, shopname: string): boolean {
    const account = this.localStorageService.get('user', '');
    console.log('account:' + account);
    if (account != null && (phone === account.accounts[0].identifier || email === account.accounts[1].identifier)) {
      console.log('该账号已经注册过了');
      return false;
    }
    const user = {
      shopName: shopname,
      accounts: [],
      uid: 0,
      createTime: ''
    };
    // 两种登录方式，两个账号分别为手机、邮箱
    user.accounts[0] = { identifier: phone, passwordToken: password};
    user.accounts[1] = { identifier: email, passwordToken: password};
    const time = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace('/T/g', ' ').replace('/\.[\d]{3}Z/', '');
    this.localStorageService.set('signupTime', time);
    user.createTime = time;
    user.uid = Date.now();
    this.localStorageService.set(user.uid, user);
    console.log(user);

    return true;
  }

}
