import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[ngxScrollbarIndicatorItem]'
})
export class ScrollbarIndicatorItemDirective {
  @Input('ngxScrollbarIndicatorItem') itemName: string;
  constructor(private ele: ElementRef) { }

  get character() {
    return this.itemName.charAt(0).toUpperCase();
  }

  get offsetTop() {
    return this.ele.nativeElement.offsetTop;
  }

  get offsetHeight() {
    return this.ele.nativeElement.offsetHeight;
  }

}
