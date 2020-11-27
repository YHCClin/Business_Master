import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
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
              private navCtrl: NavController) { }

  ngOnInit() {
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
      const accounts = this.localStorageService.get('user', '').accounts;
      if (!(await this.passportService.login(this.userName, this.password)).success) {
        const alert = await this.alertCtrl.create({
          header: '提示',
          message: '用户名或者密码不正确',
          buttons: ['确定']
        });
        alert.present();
      } else {
        this.router.navigateByUrl('/tabs');
      }
    }
  }

  openForgotPassword() {
    this.router.navigateByUrl('passport/forget-password');
  }

}
