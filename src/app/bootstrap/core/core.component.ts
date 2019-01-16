import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NgxScrollbarIndicatorComponent,
  EChangeWhen,
  EPosition,
  EShowWhen,
  ETheme,
  ScrollbarIndicatorOptions
} from 'projects/ngx-scrollbar-indicator/src/public_api';
import { DATA } from 'projects/ngx-scrollbar-indicator/src/lib/MOCK_DATA';

@Component({
  selector: 'app-bootstrap-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {

  @ViewChild('indicatorRef') indicatorRef: NgxScrollbarIndicatorComponent;

  stringify = JSON.stringify;
  eChangeWhen = EChangeWhen;
  ePosition = EPosition;
  eShowWhen = EShowWhen;
  eTheme = ETheme;
  options: ScrollbarIndicatorOptions = {
    enable: true,
    changeWhen: EChangeWhen.top,
    containerHeight: 350,
    theme: ETheme.waterDrop,
    position: EPosition.auto,
    showWhen: EShowWhen.scroll
  };
  DATA: { 'first_name': string }[];
  timer: any;
  ngOnInit() {
    this.DATA = DATA.sort((a, b) => a.first_name < b.first_name ? -1 : (a.first_name > b.first_name ? 1 : 0));
  }

  showIndicator(duration?: number) {
    if (!duration) {
      this.timer = this.indicatorRef.showIndicator(this.timer);
    } else {
      this.timer = this.indicatorRef.showIndicator(this.timer, duration);
    }
  }

  changeWhen() {
    setTimeout(() => {
      this.indicatorRef.startCalculation();
    });
  }

}