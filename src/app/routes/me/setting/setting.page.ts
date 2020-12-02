import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(private localStorage: LocalStorageService,
              private router: Router,
              private appComponent: AppComponent) { }

  public version: string;
  ngOnInit() {
    this.version = this.localStorage.get('App').version;
    this.appComponent.ionViewDidLeave();
  }

  onLogout(){
    this.localStorage.set('user', null);
    this.localStorage.set('loginStatus', false);
    this.localStorage.set('expiredTime', Date.now());
    this.router.navigateByUrl('/passport/login');
  }

}
