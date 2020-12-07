import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { SettingService } from '../../setting/setting.service';

@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.page.html',
  styleUrls: ['./shop-edit.page.scss'],
})
export class ShopEditPage implements OnInit {

  title: string;
  property: string;
  value: any; // 用于ngModel，从shop对象的相关属性中获取数据
  constructor(private activatedRoute: ActivatedRoute,
              private localStorageService: LocalStorageService,
              private toastCtrl: ToastController,
              private statusBar: StatusBar,
              private settingService: SettingService,
              private router: Router) {
      this.activatedRoute.queryParams.subscribe(queryParams => {
        this.property = queryParams.property;
        this.title = queryParams.title;
      });
      // 沉浸式并且悬浮透明
      this.statusBar.overlaysWebView(true);
    }

  ngOnInit() {
  }

  async onSave() {
    this.settingService.saveInfo(this.property, this.value);
    this.router.navigateByUrl('/me/shop');
  }

}
