import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { NgxScrollbarIndicatorComponent } from './ngx-scrollbar-indicator.component';
import { ScrollbarIndicatorItemDirective } from './directive/scrollbar-indicator-item.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgxScrollbarIndicatorCdkComponent } from './ngx-scrollbar-indicator-cdk/ngx-scrollbar-indicator-cdk.component';

@NgModule({
  declarations: [NgxScrollbarIndicatorComponent, ScrollbarIndicatorItemDirective, NgxScrollbarIndicatorCdkComponent],
  imports: [
    CommonModule,
    ScrollingModule,
    OverlayModule
  ],
  exports: [NgxScrollbarIndicatorComponent, ScrollbarIndicatorItemDirective, NgxScrollbarIndicatorCdkComponent]
})
export class NgxScrollbarIndicatorModule { }
