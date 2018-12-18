import { Component, OnInit, ViewChild } from '@angular/core';
import { DATA } from './MOCK_DATA';
import { ScrollbarIndicatorOptions, EChangeWhen, ETheme, EPosition, EShowWhen } from 'projects/ngx-scrollbar-indicator/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  options: ScrollbarIndicatorOptions = {
    enable: true,
    changeWhen: EChangeWhen.top,
    containerHeight: 500,
    theme: ETheme.circular,
    position: EPosition.top,
    showWhen: EShowWhen.scroll
  };
  DATA: { 'first_name': string }[];

  ngOnInit() {
    this.DATA = DATA.sort((a, b) => a.first_name < b.first_name ? -1 : (a.first_name > b.first_name ? 1 : 0));
  }
}
