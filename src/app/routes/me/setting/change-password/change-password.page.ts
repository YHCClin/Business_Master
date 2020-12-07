import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { PassportServiceService } from 'src/app/shared/services/passport-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  public user = {
    oldPwd: '',
    newPwd: '',
  };

  constructor(private passportService: PassportServiceService,
              private toastCtrl: ToastController,
              private router: Router,
              private alertCtrl: AlertController,
              private localStorage: LocalStorageService) { }

  ngOnInit() {
  }

  async onChange() {
    const oldpassword = this.localStorage.get('user').accounts[0].passwordToken;
    if (this.user.oldPwd == oldpassword) {
      const account = await this.localStorage.get('user');
      account.accounts[0].passwordToken = this.user.newPwd;
      account.accounts[1].passwordToken = this.user.newPwd;
      this.localStorage.set('user', account);
      let idx = 0;
      const identifier = account.accounts[0].identifier;
      const accounts = this.localStorage.get('TUser', []);
      for ( idx = 0; idx < account.accounts.length; idx++) {
        if (accounts[idx].accounts[0].identifier == identifier) {
          break;
        }
      }
      accounts.splice(idx, 1);
      accounts.push(account);
      this.localStorage.set('TUser', accounts); // 跟新表
      const alert = await this.alertCtrl.create({
        header: '提示',
        message: '密码修改成功',
        buttons: ['知道了']
      });
      alert.present();
    } else {
      const alert = await this.alertCtrl.create({
        message: '请输入正确的旧密码',
        buttons: ['知道了']
      });
      alert.present();
    }
  }






}
