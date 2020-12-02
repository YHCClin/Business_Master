import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public appPages = [
    { title: '开店论坛', url: '/home', icon: 'chatbox' },
    { title: '手机橱窗', url: '/home', icon: 'create' },
    { title: '邀请有礼', url: '/home', icon: 'git-merge' },
    { title: '资金账户', url: '/home', icon: 'cash' },
    { title: '反馈建议', url: '/home', icon: 'mail-outline' },
    { title: '帮助中心', url: '/home', icon: 'help-circle-outline' },
  ];
  public sales: Array<{title: string, content: string, previous: number, current: number}> = [{
    title: '今日',
    content: '比昨日',
    previous: 0,
    current: 0
  },
  {
    title: '七日',
    content: '比同期',
    previous: 0,
    current: 0,
  },
  {
    title: '本月',
    content: '比同期',
    previous: 0,
    current: 0
  }
];
public items: Array<{title: string, icon: string, url: string}> = [
  {
    title: '新增商品',
    icon: 'bag-add-outline',
    url: ''
  },
  {
    title: '新增会员',
    icon: 'person-add-outline',
    url: ''
  },
  {
    title: '收银记账',
    icon: 'book-outline',
    url: ''
  },
  {
    title: '支出管理',
    icon: 'cash-outline',
    url: ''
  },
  {
    title: '商品管理',
    icon: 'apps-outline',
    url: ''
  },
  {
    title: '会员管理',
    icon: 'people-outline',
    url: ''
  },
  {
    title: '查询销售',
    icon: 'search-outline',
    url: ''
  },
  {
    title: '智能分析',
    icon: 'bar-chart-outline',
    url: ''
  },
  {
    title: '供应商管理',
    icon: 'storefront-outline',
    url: ''
  },
  {
    title: '挂单',
    icon: 'checkmark-done-outline',
    url: ''
  },
  {
    title: '高级功能',
    icon: 'add-outline',
    url: ''
  }
];
  constructor(private appComponent: AppComponent) { }
  ngOnInit() {
    this.getSales();
    this.appComponent.ionViewDidLeave();
  }
  minus(current: number, previous: number): number {
    const result = current - previous;
    if (result > 0) {
      return 1;
    } else if (result === 0) {
      return 0;
    } else {
      return -1;
    }
  }

  getSales() {
    this.sales[0].previous = Math.random() * 1000;
    this.sales[0].current = Math.random() * 1000;

    this.sales[1].previous = Math.random() * 1000;
    this.sales[1].current = Math.random() * 1000;

    this.sales[2].previous = Math.random() * 1000;
    this.sales[2].current = Math.random() * 1000;
  }

}
