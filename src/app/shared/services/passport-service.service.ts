import { Injectable } from '@angular/core';
import { AjaxResult } from '../class/ajax-result';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PassportServiceService {

  constructor(private localStorageService: LocalStorageService) { }

  async addUser(phone: string, email: string, password: string, shopname: string): Promise<AjaxResult> {
    const account = await this.localStorageService.get('user', '');
    console.log('account:' + account);
    if (account != null && (phone === account.accounts[0].identifier || email === account.accounts[1].identifier)) {
      console.log('该账号已经注册过了');
      return new AjaxResult(false, null, {message: '您的手机号已经被注册', details: ''});
    }
    // 定义User结构
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
    this.localStorageService.set('user', user);
    console.log(user);

    return new AjaxResult(true, null);
  }

  async login(phoneOrEmail: string, password: string): Promise<AjaxResult> {
    const accounts = this.localStorageService.get('user', '').accounts;
    if ((phoneOrEmail == accounts[0].identifier && password == accounts[0].passwordToken)
      || (phoneOrEmail == accounts[1].identifier && password == accounts[1].passwordToken)) {
      const loginTime = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace('/T/g', ' ').replace('/\.[\d]{3}Z/', '');
      // 记录登录时间，过期时间，账号
      this.localStorageService.set('loginTime', loginTime);
      this.localStorageService.set('expiredTime', Date.now() + 5 * 24 * 60 * 60 * 1000);
      this.localStorageService.set('lastLoginAccount', phoneOrEmail);
      return new AjaxResult(true, null); // 账号或密码错误
    }
    return new AjaxResult(false, null, {message: '登录失败', details: ''});
  }

  getPassword(): string {
    return this.localStorageService.get('user', '').accounts[0].passwordToken;
  }

  updatePassword(password: string): boolean {
    const tmp = this.localStorageService.get('user', '');
    tmp.accounts[0].passwordToken = password;
    tmp.accounts[1].passwordToken = password;
    this.localStorageService.set('user', tmp);
    return true;
  }

}
