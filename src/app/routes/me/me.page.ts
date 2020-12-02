import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.page.html',
  styleUrls: ['./me.page.scss'],
})
export class MePage implements OnInit {
  public appPages = [
    { title: '开店论坛', url: '/home', icon: 'chatbox' },
    { title: '手机橱窗', url: '/home', icon: 'create' },
    { title: '邀请有礼', url: '/home', icon: 'git-merge' },
    { title: '资金账户', url: '/home', icon: 'cash' },
    { title: '反馈建议', url: '/home', icon: 'mail' },
    { title: '帮助中心', url: '/home', icon: 'help-circle' },
  ];
  constructor(private toastCtrl: ToastController,
              private localStorageService: LocalStorageService,
              private router: Router) { }

  ngOnInit() {
  }

  async Tips() {
    const toast = await this.toastCtrl.create({
      message: '页面未实现',
      duration: 3000
    });
    toast.present();
  }
  onGoToSetting() {
    this.router.navigateByUrl('/me/setting');
  }
}
