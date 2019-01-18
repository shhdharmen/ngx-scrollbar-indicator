import { Component, OnInit, ViewChild, ChangeDetectionStrategy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
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
  styleUrls: ['./use-angular-cdk.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UseAngularCdkComponent implements OnInit, AfterViewInit {
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
  currentCharacter: string;

  constructor(private _changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.DATA = [
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' },
      { 'first_name': 'AAA' }
    ];
  }

  ngAfterViewInit() {
    this._changeDetectorRef.detach();
  }

  detectChanges(character: string) {
    this.currentCharacter = character;
    this._changeDetectorRef.detectChanges();
  }

  appendData() {
    this.DATA = this.DATA.concat([
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' },
      { 'first_name': 'BBB' }
    ]);
    // console.log(this.DATA);
    this._changeDetectorRef.detectChanges();
  }
}
