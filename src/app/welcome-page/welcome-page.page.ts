import { CommonService } from '../common.function';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.page.html',
  styleUrls: ['./welcome-page.page.scss'],
})
export class WelcomePagePage implements OnInit {
  @ViewChild('slides') slider: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };
  slideLast = false;

  constructor(public config: CommonService) {}

  ngOnInit() {}

  GoNavig() {
    this.config.navigate('home');
  }

  getIndex(event) {
    this.slider.getActiveIndex().then((val) => {
      this.slideLast = val === 3;
    });
  }
}
