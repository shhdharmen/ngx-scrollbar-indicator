import { NgModule } from '@angular/core';
import { NgxScrollbarIndicatorComponent } from './ngx-scrollbar-indicator.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ScrollbarIndicatorItemDirective } from './directive/scrollbar-indicator-item.directive';

@NgModule({
  declarations: [NgxScrollbarIndicatorComponent, ScrollbarIndicatorItemDirective],
  imports: [
    CommonModule,
    BrowserModule
  ],
  exports: [NgxScrollbarIndicatorComponent, ScrollbarIndicatorItemDirective]
})
export class NgxScrollbarIndicatorModule { }
