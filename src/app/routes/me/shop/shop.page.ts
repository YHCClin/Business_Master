import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  constructor(private localStorageService: LocalStorageService) { }
  public shop = {
    shopName: '',
    shortName: '',
    phone: '',
    email: '',
    shopKeeperName: '',
    shopTel: '',
    shopType: '',
    creatTime: ''
  };

  ngOnInit() {
    this.ionViewWillEnter();
  }

  // 页面初始化
  ionViewWillEnter(){
    const account = this.getUser();
    if (account !== null) {
      this.shop.shopName = account.shopInfo.shopName;
      this.shop.shortName = account.shopInfo.shortName;
      this.shop.phone = account.shopInfo.phone;
      this.shop.email = account.shopInfo.email;
      this.shop.shopKeeperName = account.shopInfo.shopKeeperName;
      this.shop.shopTel = account.shopInfo.shopTel;
      this.shop.shopType = account.shopInfo.shopType;
      this.shop.creatTime = account.createTime;
    }
  }

  getUser() {
    return this.localStorageService.get('user', null);
  }
}
