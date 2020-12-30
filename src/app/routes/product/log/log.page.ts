import { Component, Injectable, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.page.html',
  styleUrls: ['./log.page.scss'],
})
@Injectable()
export class LogPage implements OnInit {

  log: any;
  constructor(private localStorage: LocalStorageService) {
    this.ionViewDidEnter();
  }
  ionViewDidEnter() {
    this.log = this.localStorage.get('modifyLog', []);
  }
  ngOnInit() {
  }

}
