import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ScrollingModule } from "@angular/cdk/scrolling";

import { ScrollbarIndicatorItemDirective } from "./directive/scrollbar-indicator-item.directive";
import { OverlayModule } from "@angular/cdk/overlay";
import { NgxScrollbarIndicatorComponent } from "./component/ngx-scrollbar-indicator.component";

@NgModule({
  declarations: [
    ScrollbarIndicatorItemDirective,
    NgxScrollbarIndicatorComponent
  ],
  imports: [CommonModule, ScrollingModule, OverlayModule],
  exports: [ScrollbarIndicatorItemDirective, NgxScrollbarIndicatorComponent]
})
export class NgxScrollbarIndicatorModule {}
