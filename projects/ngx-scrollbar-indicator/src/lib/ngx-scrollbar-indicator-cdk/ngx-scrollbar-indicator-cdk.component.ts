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
  ChangeDetectorRef,
  Output,
  EventEmitter
} from '@angular/core';
import { ScrollbarIndicatorOptions, EPosition, EChangeWhen, EShowWhen, ETheme } from '../interface/scrollbar-indicator-options';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import { ScrollbarIndicatorItemDirective } from '../directive/scrollbar-indicator-item.directive';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-scrollbar-indicator-cdk',
  templateUrl: './ngx-scrollbar-indicator-cdk.component.html',
  styleUrls: ['./ngx-scrollbar-indicator-cdk.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxScrollbarIndicatorCdkComponent implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {
  /**
   * Default options for ng-scrollbar-indicator
  */
  defaultOptions: ScrollbarIndicatorOptions = {
    enable: true,
    changeWhen: EChangeWhen.top,
    containerHeight: 500,
    position: EPosition.auto,
    showWhen: EShowWhen.scroll,
    theme: ETheme.waterDrop
  };
  /**
     * User input for options
    */
  @Input() options: ScrollbarIndicatorOptions;
  // Children
  @ContentChildren(ScrollbarIndicatorItemDirective) private _items !: QueryList<ScrollbarIndicatorItemDirective>;

  @ViewChild(CdkScrollable) scrollable: CdkScrollable;
  @ViewChild('indicator') indicator: ElementRef;

  @Output() elementScrolled = new EventEmitter();

  // Properties
  /**Stream that emits current character */
  private _currentCharacterObserver = new Subject<string>();
  currentCharacterObserver = this._currentCharacterObserver.asObservable();
  /**EShowWhen interface variable, for internal use only */
  private _eShowWhen = EShowWhen;
  viewScrollTop: number;
  viewScrollHeight: number;
  /**All Items Array */
  all: ScrollbarIndicatorItemDirective[] = [];
  /**JSON Object with first item of each character */
  firsts: { [x: string]: ScrollbarIndicatorItemDirective } = {};
  /**JSON Object with last item of each character */
  lasts: { [x: string]: ScrollbarIndicatorItemDirective } = {};
  private _listToBeConsidered: string[];
  private _characters = [];
  numberOfItems: number;
  /**EShowWhen interface variable, for internal use only. Used in HTML */
  eShowWhen = EShowWhen;
  constructor(private _scrollDispatcher: ScrollDispatcher,
    private _renderer: Renderer2,
    private _changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.checkOptions();
  }

  ngAfterViewInit() {
    if (this.options.enable) {
      if (this.options.showWhen === this._eShowWhen.scroll) {
        this.registerScroll();
      }
    } else {
      this.registerScrollChar();
    }
  }

  private registerScroll() {
    let timer = null;
    this._scrollDispatcher.register(this.scrollable);
    this.viewScrollHeight = this.scrollable.getElementRef().nativeElement.scrollHeight;
    this._scrollDispatcher.scrolled(200).subscribe((cdks: CdkScrollable) => {
      this._changeDetectorRef.detach();
      this.viewScrollTop = cdks.measureScrollOffset('top');
      const percentTop = (this.viewScrollTop * 100) / this.viewScrollHeight;
      this._renderer.setStyle(this.indicator.nativeElement, 'top', (Math.round(percentTop * 100) / 100) + '%');
      timer = this.showIndicator(timer);
      this.updateCharacter();
    });
  }

  private registerScrollChar() {
    this._scrollDispatcher.register(this.scrollable);
    this.viewScrollHeight = this.scrollable.getElementRef().nativeElement.scrollHeight;
    this._scrollDispatcher.scrolled(200).subscribe((cdks: CdkScrollable) => {
      this._changeDetectorRef.detach();
      this.viewScrollTop = cdks.measureScrollOffset('top');
      this.updateCharacter();
    });
  }

  /**If user has not provided any options, take default ones. */
  private checkOptions() {
    if (this.options) {
      this.options.enable = this.options.enable ? this.options.enable : this.defaultOptions.enable;
      this.options.changeWhen = this.options.changeWhen ? this.options.changeWhen : this.defaultOptions.changeWhen;
      this.options.containerHeight = this.options.containerHeight ? this.options.containerHeight : this.defaultOptions.containerHeight;
      this.options.position = this.options.position ? this.options.position : this.defaultOptions.position;
      this.options.showWhen = this.options.showWhen ? this.options.showWhen : this.defaultOptions.showWhen;
      this.options.theme = this.options.theme ? this.options.theme : this.defaultOptions.theme;
    } else {
      this.options = Object.assign({}, this.defaultOptions);
    }
  }

  /**Update the character to be emitted */
  private updateCharacter() {
    this._listToBeConsidered.find(key => {
      const firstItem = this.firsts[key];
      const lastItem = this.lasts[key];
      const condition = (this.viewScrollTop <= firstItem.offsetTop &&
        (firstItem.offsetHeight + firstItem.offsetTop) < (this.viewScrollTop + this.viewScrollHeight)) ||
        (this.viewScrollTop <= lastItem.offsetTop &&
          (lastItem.offsetHeight + lastItem.offsetTop) < (this.viewScrollTop + this.viewScrollHeight));
      if (condition) {
        this._currentCharacterObserver.next(key);
        this._changeDetectorRef.detectChanges();
        this.elementScrolled.emit();
        return condition;
      }
    });
  }

  ngAfterContentInit() {
    this.startCalculation();
    this._items.changes.subscribe(_ => {
      this.startCalculation();
    });
  }

  ngOnDestroy() {
    this._currentCharacterObserver.unsubscribe();
  }

  /**Process number of children and generate firsts and lasts objects */
  startCalculation() {
    setTimeout(() => {
      this.numberOfItems = this._items.length;
      this._items.forEach(item => {
        this.all.push(item);
        if (!this.firsts[item.character]) {
          this._characters.push(item.character);
          this.firsts[item.character] = item;
        }
        this.lasts[item.character] = item;
      });
      if (this.options.changeWhen === EChangeWhen.top) {
        this._listToBeConsidered = this._characters;
      } else {
        this._listToBeConsidered = this._characters.reverse();
      }
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
   * This function will work only in Non-IE Browsers
   * @param letter Character to which viewport should be scrolled
   * @param position Element of that character group, first or last
   */
  goToLetter(letter: string, position = 'first'): number {
    try {
      const offsetTop = this[position + 's'][letter.toUpperCase()].offsetTop;
      this.scrollable.scrollTo({ top: offsetTop, behavior: 'smooth' });
      return offsetTop;
    } catch (e) {
      console.error('The letter you tried to scroll to, could not be found in list. Full error log can be found below:\n', e);
      return -1;
    }
  }
}
