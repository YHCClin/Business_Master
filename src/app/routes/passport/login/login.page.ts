import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { PassportServiceService } from 'src/app/shared/services/passport-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public userName = '';
  public password = '';
  constructor(private localStorageService: LocalStorageService,
              private router: Router,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private passportService: PassportServiceService,
              private navCtrl: NavController,
              private appComponent: AppComponent) {
                this.appComponent.ionViewWillEnter();
                this.localStorageService.set('loginStatus', false);
              }

  ngOnInit() {
    const alreadySignup = this.localStorageService.get('alreadySignup', false);
    const account = this.localStorageService.get('user', null);
    const lastLoginAccount = this.localStorageService.get('lastLoginAccount', null);
    const expiredTime = this.localStorageService.get('expiredTime', null);
    this.userName = lastLoginAccount;
    if (alreadySignup && account !== null) {
      this.userName = this.localStorageService.get('user').accounts[0].identifier;
      this.password = this.localStorageService.get('user').accounts[0].passwordToken;
      this.localStorageService.set('alreadySignup', false);
    }
    else if (lastLoginAccount != null && expiredTime != null &&  (Date.now() > expiredTime)) {
      this.userName = lastLoginAccount;
      this.password = null;
      this.localStorageService.set('user', null); // 忘记用户登录
    }
  }
  async onLogin(form: NgForm) {
    console.log(this.userName);
    // 账号为空时提示输入账号
    if (this.userName === '') {
      const toast = await this.toastCtrl.create({
        message: '请输入您的手机号码或者邮箱',
        duration: 3000
      });
      toast.present();
    } else if (this.password === '') {
      const toast = await this.toastCtrl.create({
        message: '请输入您的密码',
        duration: 3000
      });
      toast.present();
    } else {
      // 密码不对时提示错误
      if (!(await this.passportService.login(this.userName, this.password)).success) {
        const alert = await this.alertCtrl.create({
          header: '提示',
          message: '用户名或者密码不正确',
          buttons: ['确定']
        });
        alert.present();
      } else {
        this.localStorageService.set('lastLoginAccount', this.localStorageService.get('user').accounts[0].identifier);
        this.router.navigateByUrl('/tabs/home');
        this.localStorageService.set('loginStatus', true);
        this.appComponent.initializeApp();
      }
    }
  }

  onForgotPassword() {
    this.router.navigateByUrl('passport/forgot-password');
  }

}
