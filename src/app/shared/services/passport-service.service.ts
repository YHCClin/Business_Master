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
    const accounts = await this.localStorageService.get('TUser', []);
    console.log('account:' + account);
    for (const act of accounts) {
      if ((phone === act.accounts[0].identifier || email === act.accounts[1].identifier)) {
        console.log('该账号已经注册过了');
        return new AjaxResult(false, null, {message: '您的手机号已经被注册', details: ''});
      }
    }
    // 定义User结构
    const user = {
      userName: '',
      accounts: [],
      uid: '',
      createTime: '',
      shopInfo: {
        shopName: '',
        shortName: '',
        phone: '',
        email: '',
        shopKeeperName: '',
        shopTel: '',
        shopType: ''
      }
    };
    // 两种登录方式，两个账号分别为手机、邮箱
    user.accounts[0] = { identifier: phone, passwordToken: password};
    user.accounts[1] = { identifier: email, passwordToken: password};
    const time = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
    this.localStorageService.set('signupTime', time);
    user.userName = shopname;
    user.createTime = time;
    user.uid = 'uid' + Date.now().toString();
    user.shopInfo.shopName = shopname;
    user.shopInfo.shortName = shopname;
    user.shopInfo.shopKeeperName = shopname;
    user.shopInfo.phone = phone;
    user.shopInfo.email = email;
    user.shopInfo.shopTel = phone;

    this.localStorageService.set('user', user); // 写入当前登录用户信息
    console.log(user);
    accounts.push(user); // 新用户进用户表
    this.localStorageService.set('TUser', accounts); // 更新用户表
    return new AjaxResult(true, null);
  }

  async login(phoneOrEmail: string, password: string): Promise<AjaxResult> {
    const accounts = this.localStorageService.get('TUser', []);
    // 判断是否在用户表中，在则登录
    for (const act of accounts) {
      if ((phoneOrEmail == act.accounts[0].identifier && password == act.accounts[0].passwordToken)
        || (phoneOrEmail == act.accounts[1].identifier && password == act.accounts[1].passwordToken)) {
        const loginTime = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
        // 记录登录时间，过期时间，账号
        this.localStorageService.set('loginTime', loginTime);
        this.localStorageService.set('expiredTime', Date.now() + 5 * 24 * 60 * 60 * 1000);
        this.localStorageService.set('lastLoginAccount', phoneOrEmail);
        this.localStorageService.set('user', act); // 记录登录用户
        return new AjaxResult(true, null); // 账号或密码错误
      }
    }
    return new AjaxResult(false, null, {message: '登录失败', details: ''});
  }

  getPassword(): string {
    return this.localStorageService.get('user', '').accounts[0].passwordToken;
  }

  /**
   * 修改当前用户的密码
   * @ param password
   */
  updatePassword(password: string): boolean {
    const tmp = this.localStorageService.get('user', ''); // 得到当前登录用户
    const currentAct = tmp.accounts[0].identifier; // 获得手机号
    const accounts = this.localStorageService.get('TUser', []); // 用户表
    let idx = 0;
    for (idx = 0; idx < accounts.length; idx++) {
      if (currentAct == accounts[idx].accounts[0].identifier) {
        break;
      }
    }
    // 删除表中用户
    accounts.splice(idx, 1);
    tmp.accounts[0].passwordToken = password;
    tmp.accounts[1].passwordToken = password;
    this.localStorageService.set('user', tmp);
    accounts.push(tmp);
    this.localStorageService.set('TUser', accounts); // 更新表
    return true;
  }

}
