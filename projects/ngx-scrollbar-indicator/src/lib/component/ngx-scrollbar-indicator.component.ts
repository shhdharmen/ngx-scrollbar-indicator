import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ViewChild,
  AfterViewInit,
  ElementRef,
  Renderer2,
  ContentChildren,
  QueryList,
  AfterContentInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import {
  ScrollbarIndicatorOptions,
  EShowWhen,
  ETheme
} from '../interface/scrollbar-indicator-options';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import { ScrollbarIndicatorItemDirective } from '../directive/scrollbar-indicator-item.directive';
import { Subject, Subscription } from 'rxjs';
import { Platform, supportsScrollBehavior } from '@angular/cdk/platform';

@Component({
  selector: 'ngx-scrollbar-indicator',
  templateUrl: './ngx-scrollbar-indicator.component.html',
  styleUrls: ['./ngx-scrollbar-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxScrollbarIndicatorComponent
  implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {
  // Inputs
  /**Default options for ng-scrollbar-indicator*/
  defaultOptions: ScrollbarIndicatorOptions = {
    enable: true,
    containerHeight: 500,
    showWhen: EShowWhen.scroll,
    theme: ETheme.waterDrop
  };
  /**User input for options*/
  @Input() options: ScrollbarIndicatorOptions;

  // Children
  /**ScrollbarIndicatorItemDirectives */
  @ContentChildren(ScrollbarIndicatorItemDirective) private _items!: QueryList<
    ScrollbarIndicatorItemDirective
  >;
  /**Scrollable view port */
  @ViewChild(CdkScrollable) scrollable: CdkScrollable;
  /**Indicator */
  @ViewChild('indicator') indicator: ElementRef;
  /**Indicator Container Parent */
  @ViewChild('indicatorContainerParent') indicatorContainerParent: ElementRef;
  /**Indicator Box */
  @ViewChild('indicatorBox') indicatorBox: ElementRef;

  // Properties
  /**This will contain all subscriptions, so that it will be easy to unsubscribe at once. */
  private _subs$: (Subscription | Subject<any>)[] = [];
  /**scrollTop of view port */
  viewScrollTop: number;
  /**scrollHeight of view port */
  viewScrollHeight: number;
  /**All Items Array */
  all: ScrollbarIndicatorItemDirective[] = [];
  /**JSON Object with first item of each character */
  firsts: { [x: string]: ScrollbarIndicatorItemDirective } = {};
  /**JSON Object with last item of each character */
  lasts: { [x: string]: ScrollbarIndicatorItemDirective } = {};
  private _listToBeConsidered: string[];
  /**Array if all first characters */
  private _characters = [];
  /**EShowWhen interface variable, for internal use only. Used in HTML */
  eShowWhen = EShowWhen;
  /**Scrollbar thumb height */
  thumbHeight: number;
  /**Browser specific scrollbar arrow sizes */
  private readonly _arrowSizes = {
    firefox: 16,
    webkit: 16,
    trident: 33,
    edge: 16
  };
  /**Check whether platform supports scrolling behaviors */
  private readonly _supportsScrollBehavior = supportsScrollBehavior();
  scrollableElementRef: ElementRef<HTMLElement>;
  currentCharacter: string;
  constructor(
    private _scrollDispatcher: ScrollDispatcher,
    private _renderer: Renderer2,
    private _changeDetectorRef: ChangeDetectorRef,
    private _platform: Platform
  ) {}

  ngOnInit() {
    this.checkOptions();
  }

  ngAfterViewInit() {
    this.scrollableElementRef = this.scrollable.getElementRef();
    this.beginScrollRegistration();
  }

  private beginScrollRegistration() {
    this._scrollDispatcher.register(this.scrollable);
    if (this.options.enable) {
      if (this._supportsScrollBehavior) {
        this.calculateThumbHeight();
        this.registerScroll();
      } else {
        console.warn(`Your current platform does not support scroll behavior or passive event listeners.
        More at : https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md`);
        this.registerScrollChar();
      }
    } else {
      this.registerScrollChar();
    }
  }

  private registerScroll() {
    let timer = null;
    const scrollSub$ = this._scrollDispatcher.scrolled().subscribe(() => {
      this.setIndicatorPosition();
      timer = this.showIndicator(timer);
      this.updateCharacter();
    });
    this._subs$.push(scrollSub$);
  }

  private registerScrollChar() {
    const scrollSub$ = this._scrollDispatcher.scrolled().subscribe(() => {
      this.viewScrollTop = this.scrollable.measureScrollOffset('top');
      this.updateCharacter();
    });
    this._subs$.push(scrollSub$);
  }

  private setIndicatorPosition() {
    this.viewScrollTop = this.scrollable.measureScrollOffset('top');
    const percentTop = (this.viewScrollTop * 100) / this.viewScrollHeight;
    this._renderer.setStyle(
      this.indicatorBox.nativeElement,
      'top',
      Math.round(percentTop * 100) / 100 + '%'
    );

    // const containerCenter = this.options.containerHeight / 2;
    // const indicatorBoxCenter = this.indicatorBox.nativeElement.offsetHeight / 2;
    // const centerCalculationBox = this.options.containerHeight - this.indicatorBox.nativeElement.offsetHeight;
    this._renderer.setStyle(
      this.indicator.nativeElement,
      'top',
      Math.round(percentTop * 100) / 100 + '%'
    );
  }

  /**If user has not provided any options, take default ones. */
  private checkOptions() {
    if (this.options) {
      this.options.enable = this.options.enable
        ? this.options.enable
        : this.defaultOptions.enable;
      this.options.containerHeight = this.options.containerHeight
        ? this.options.containerHeight
        : this.defaultOptions.containerHeight;
      this.options.showWhen = this.options.showWhen
        ? this.options.showWhen
        : this.defaultOptions.showWhen;
      this.options.theme = this.options.theme
        ? this.options.theme
        : this.defaultOptions.theme;
    } else {
      this.options = Object.assign({}, this.defaultOptions);
    }
  }

  /**Update the character to be emitted */
  private updateCharacter() {
    this._listToBeConsidered.find(key => {
      const firstItem = this.firsts[key];
      const lastItem = this.lasts[key];
      const condition =
        (this.viewScrollTop <= firstItem.offsetTop &&
          firstItem.offsetHeight + firstItem.offsetTop <
            this.viewScrollTop + this.viewScrollHeight) ||
        (this.viewScrollTop <= lastItem.offsetTop &&
          lastItem.offsetHeight + lastItem.offsetTop <
            this.viewScrollTop + this.viewScrollHeight);
      if (condition) {
        this.currentCharacter = key;
        this._changeDetectorRef.detectChanges();
        return condition;
      }
    });
  }

  /**Calculate scrollbar thumb height */
  private calculateThumbHeight() {
    this.viewScrollHeight = this.scrollableElementRef.nativeElement.scrollHeight;
    let arrowHeight: number;
    if (this._platform.EDGE) {
      arrowHeight = this._arrowSizes.edge;
    } else if (this._platform.FIREFOX) {
      arrowHeight = this._arrowSizes.firefox;
    } else if (this._platform.TRIDENT) {
      arrowHeight = this._arrowSizes.trident;
    } else if (this._platform.WEBKIT) {
      arrowHeight = this._arrowSizes.webkit;
    }
    const contentHeight = this.options.containerHeight;

    const viewableRatio =
      Math.round((this.viewScrollHeight / contentHeight) * 100) / 100;

    const scrollBarArea =
      Math.round((contentHeight - arrowHeight * 2) * 100) / 100;

    this.thumbHeight = Math.round((scrollBarArea / viewableRatio) * 100) / 100;
    this._renderer.setStyle(
      this.indicatorBox.nativeElement,
      'height',
      this.thumbHeight + 'px'
    );

    this._renderer.setStyle(
      this.indicatorContainerParent.nativeElement,
      'top',
      arrowHeight + 'px'
    );
    this._renderer.setStyle(
      this.indicatorContainerParent.nativeElement,
      'bottom',
      arrowHeight + 'px'
    );
  }

  ngAfterContentInit() {
    this.startCalculation();
    const itemChanges$ = this._items.changes.subscribe(_ => {
      this.startCalculation();
      this.setIndicatorPosition();
      this._scrollDispatcher.deregister(this.scrollable);
      this.beginScrollRegistration();
      this._changeDetectorRef.detectChanges();
    });
    this._subs$.push(itemChanges$);
  }

  ngOnDestroy() {
    this._subs$.forEach(sub$ => {
      sub$.unsubscribe();
    });
  }

  /**Process number of children and generate firsts and lasts objects */
  startCalculation() {
    setTimeout(() => {
      this._items.forEach(item => {
        this.all.push(item);
        if (!this.firsts[item.character]) {
          this._characters.push(item.character);
          this.firsts[item.character] = item;
        }
        this.lasts[item.character] = item;
      });
      this._listToBeConsidered = this._characters;
    });
  }

  /**This will show the indicator.
   * @description This will add 'show' class to the indicator. And After duration(default 500), if will remove the same.
   * Calling this won't make any sense if showWhen is set to EShowWhen.always
   * @param timer NodeJS.Timer, this will help to maintain frequent calls to this function
   * @param duration Duration after which indicator will be hidden
   * @returns NodeJS.Timer, which can be cleared if you are calling this function again within duration.
   */
  showIndicator(timer: any, duration = 500) {
    if (timer !== null) {
      this.indicator.nativeElement.classList.add('show');
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      this.indicator.nativeElement.classList.remove('show');
    }, duration);
    return timer;
  }

  /**Scroll to a specific letter, positioned first of last.
   * Returns the offsetTop if element found, else -1.
   * @param letter Character to which viewport should be scrolled
   * @param position Element of that character group, first or last
   */
  goToLetter(letter: string, position = 'first'): number {
    try {
      const offsetTop = this[position + 's'][letter.toUpperCase()].offsetTop;
      // smooth behavior will work in firefox and chrome, but not in IE and Edge.
      this.scrollable.scrollTo({ top: offsetTop, behavior: 'smooth' });
      return offsetTop;
    } catch (e) {
      console.error(
        'The letter you tried to scroll to, could not be found in list. Full error log can be found below:\n',
        e
      );
      return -1;
    }
  }
}
