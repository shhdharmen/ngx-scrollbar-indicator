import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {
  EChangeWhen,
  EPosition,
  EShowWhen,
  ETheme,
  ScrollbarIndicatorOptions,
  NgxScrollbarIndicatorCdkComponent
} from 'projects/ngx-scrollbar-indicator/src/public_api';
import { DATA } from '../MOCK_DATA';

@Component({
  selector: 'app-use-angular-cdk',
  templateUrl: './use-angular-cdk.component.html',
  styleUrls: ['./use-angular-cdk.component.scss']
})
export class UseAngularCdkComponent implements OnInit {
  @ViewChild('indicatorRef') indicatorRef: NgxScrollbarIndicatorCdkComponent;
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

  constructor(private _changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.DATA = DATA.sort((a, b) => a.first_name < b.first_name ? -1 : (a.first_name > b.first_name ? 1 : 0));
  }

  detectChanges() {
    this._changeDetectorRef.detectChanges();
  }
}
