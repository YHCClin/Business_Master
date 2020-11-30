import { LocalStorageService } from './../../../shared/services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { AuthenticationCodeServiceService } from 'src/app/shared/services/authentication-code-service.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(private localStorage: LocalStorageService,
              private alertCtrl: AlertController,
              private navCtrl: NavController,
              private toastCtrl: ToastController,
              private router: Router,
              private authenticationCode: AuthenticationCodeServiceService) { }

  public account = '';
  public inputCode = '';
  public newPassword = '';
  verifyCode: any = {
    verifyCodeTips: '获取验证码',
    code : '',
    codeLength: 4,
    countdown: 60,
    disable: true,
    fail: false// 验证失败
  };
  ngOnInit() {
  }
  async onClick() {
    const user = this.localStorage.get('user', '');
    console.log('count:' + this.account);
    console.log(user.accounts[0]);
    if (this.account === '' || this.newPassword === '') {
      const toast = await this.toastCtrl.create({
        message: '请输入您的邮箱或者手机号码及新密码',
        duration: 3000
      });
      toast.present();
    } else if (this.account != user.accounts[0].identifier && this.account != user.accounts[1].identifier) {
      const alert = await this.alertCtrl.create({
        header: '提示',
        message: '该账号未注册',
        buttons: ['知道了']
      });
      alert.present();
    } else {
      this.getCode();
      const alert = await this.alertCtrl.create({
        header: '提示',
        message: `验证码: ${this.verifyCode.code}`,
        buttons: ['知道了']
      });
      alert.present();
      // this.router.navigateByUrl('passport/login');
    }
  }

  getCode() {
    this.verifyCode.code = this.authenticationCode.createCode(4);
    this.setTime();
  }

  async checkCode() {
    if (this.authenticationCode.validate(this.inputCode)) {
      this.verifyCode.fail = false;
      // 修改密码
      const account = await this.localStorage.get('user');
      account.accounts[0].passwordToken = this.newPassword;
      account.accounts[1].passwordToken = this.newPassword;
      this.localStorage.set('user', account);
      const alert = await this.alertCtrl.create({
        header: '提示',
        message: '密码修改成功',
        buttons: ['知道了']
      });
      alert.present();
    }
    else {
      this.verifyCode.fail = true;
    }
  }
  setTime() {
    if (this.verifyCode.countdown === 1) {
        this.verifyCode.countdown = 60;
        this.verifyCode.verifyCodeTips = '重新获取';
        this.verifyCode.disable = true;
        return;
    } else {
        this.verifyCode.countdown--;
        this.verifyCode.disable = false;
    }

    this.verifyCode.verifyCodeTips = '重新获取(' + this.verifyCode.countdown + ')';
    setTimeout(() => {
        this.verifyCode.verifyCodeTips = '重新获取(' + this.verifyCode.countdown + ')';
        this.setTime();
    }, 1000);
  }
}
