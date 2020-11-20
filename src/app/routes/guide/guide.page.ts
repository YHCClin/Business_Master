import { LocalStorageService } from './../../shared/services/local-storage.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlide, IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';

const APP_KEY = 'App';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.page.html',
  styleUrls: ['./guide.page.scss'],
})
export class GuidePage implements OnInit {
  public showSkip = true;
  @ViewChild('slides', {static: false}) slides: IonSlides;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSignup(event) {
    this.router.navigateByUrl('/passport/signup');
  }

  onSlideWillChange(event) {
    this.slides.isEnd().then((end) => {
      this.showSkip = !end;
    });
  }
  onSkipToEnd(event) {
    this.slides.slideTo(2);
  }

}
