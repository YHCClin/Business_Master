import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlide, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.page.html',
  styleUrls: ['./guide.page.scss'],
})
export class GuidePage implements OnInit {
  showSkip = true;
  @ViewChild('slides', {static: false}) slides: IonSlides;
  constructor() { }

  ngOnInit() {
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
