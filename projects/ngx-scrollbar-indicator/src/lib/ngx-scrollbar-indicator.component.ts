import {
  Component,
  ViewChild, Input,
  ContentChildren, QueryList, ElementRef, HostListener, OnInit, OnChanges, AfterViewInit, AfterContentInit
} from '@angular/core';
import { Subject } from 'rxjs';
import { ScrollbarIndicatorOptions, EChangeWhen, EPosition, EShowWhen, ETheme } from './interface/scrollbar-indicator-options';
import { ScrollbarIndicatorItemDirective } from './directive/scrollbar-indicator-item.directive';

@Component({
  selector: 'ngx-scrollbar-indicator',
  template: `<div class="scrollbar-indicator-container">
  <div [ngStyle]="{'height': options.containerHeight + 'px', 'overflow-y': 'auto'}" #mainDiv>
    <ng-content></ng-content>
  </div>
  <div class="scroll-thumbs-indicator" #scrollThumbsIndicator *ngIf="options.enable">
    <div class="indicator-container-parent">
      <div class="indicator-container" [ngClass]="{'always' : options.showWhen === eShowWhen.always}">
        <div class="indicator" [ngClass]="[options.theme]">
          <div class="background" #background></div>
          <div class="text">{{currentCharacterObserver | async}}</div>
        </div>
      </div>
    </div>
  </div>
</div>`
})
export class NgxScrollbarIndicatorComponent implements OnInit, OnChanges, AfterViewInit, AfterContentInit {
  /**
   * Default options for ng-scrollbar-indicator
  */
  defaultOptions: ScrollbarIndicatorOptions = {
    enable: true,
    changeWhen: EChangeWhen.top,
    containerHeight: 500,
    position: EPosition.auto,
    showWhen: EShowWhen.scroll,
    theme: ETheme.waterDrop,
    showCharacterPanel: false
  };
  /**
   * User input for options
  */
  @Input() options: ScrollbarIndicatorOptions;

  // Children
  @ContentChildren(ScrollbarIndicatorItemDirective) private _items !: QueryList<ScrollbarIndicatorItemDirective>;
  @ViewChild('mainDiv') private _mainDiv: ElementRef;
  @ViewChild('scrollThumbsIndicator') private _scrollThumbsIndicator: ElementRef;
  @ViewChild('background') private _background: ElementRef;

  // Properties
  /**Stream that emits current character */
  private _currentCharacterObserver = new Subject<string>();
  currentCharacterObserver = this._currentCharacterObserver.asObservable();
  objectKeys = Object.keys;
  private _numberOfItems: number;
  /**All Items Array */
  all: ScrollbarIndicatorItemDirective[] = [];
  /**JSON Object with first item of each character */
  firsts: { [x: string]: ScrollbarIndicatorItemDirective } = {};
  /**JSON Object with last item of each character */
  lasts: { [x: string]: ScrollbarIndicatorItemDirective } = {};
  private _listToBeConsidered: string[];
  private _characters = [];
  private _ticking = false;
  private _indicatorResponsible: any;
  private _mainIndicator: any;
  private _handleIndicatorTextFunctions: {
    [EPosition.auto]: Function,
    [EPosition.top]: Function
  };
  /**EShowWhen interface variable, for internal use only */
  eShowWhen = EShowWhen;
  /**Viewport Element, on which scrolling event is handled */
  view: HTMLElement;

  constructor() {
  }

  ngOnInit() {
    this.checkOptions();
    this.initHandlerFunctions();
  }

  ngOnChanges() {
    this.checkOptions();
  }

  ngAfterViewInit() {
    this.view = this._mainDiv.nativeElement;

    let timer = null;
    if (this.options.enable) {
      this._indicatorResponsible = this._scrollThumbsIndicator.nativeElement.getElementsByClassName('indicator-container')[0];
      this._mainIndicator = this._scrollThumbsIndicator.nativeElement;
      this.stylizeMainIndicator();
      if (this.options.showWhen === this.eShowWhen.scroll) {
        this.view.addEventListener('scroll', _e => {
          timer = this.showIndicator(timer);
        });
      } else if (this.options.showWhen === this.eShowWhen.always) {
        this.view.addEventListener('scroll', _e => {
          this._handleIndicatorTextFunctions[this.options.position]();
        });
      }
    } else {
      setTimeout(() => {
        this._currentCharacterObserver.next(this._characters[0]);
      });
      this.view.addEventListener('scroll', _e => {
        this.updateCharacter();
      });
    }

  }

  /**If user has not provided any options, take default ones. */
  private checkOptions() {
    if (this.options) {
      this.options.changeWhen = this.options.changeWhen ? this.options.changeWhen : this.defaultOptions.changeWhen;
      this.options.containerHeight = this.options.containerHeight ? this.options.containerHeight : this.defaultOptions.containerHeight;
      this.options.position = this.options.position ? this.options.position : this.defaultOptions.position;
      this.options.showWhen = this.options.showWhen ? this.options.showWhen : this.defaultOptions.showWhen;
      this.options.theme = this.options.theme ? this.options.theme : this.defaultOptions.theme;
    } else {
      this.options = Object.assign({}, this.defaultOptions);
    }
  }

  /**Set of functions based on 'position' from options */
  private initHandlerFunctions() {
    this._handleIndicatorTextFunctions = {
      [EPosition.auto]: () => {
        this.updatePosition();
        this.updateCharacter();
      },
      [EPosition.top]: () => {
        this.updateCharacter();
      }
    };
  }

  /**Update position of indicator */
  private updatePosition() {
    const viewScrollTop = this.view.scrollTop;
    const viewScrollHeight = this.view.scrollHeight;
    const percentTop = (viewScrollTop * 100) / viewScrollHeight;
    this._indicatorResponsible.style.top = (Math.round(percentTop * 100) / 100) + '%';
  }

  /**Update the character to be emitted */
  private updateCharacter() {
    const viewScrollTop = this.view.scrollTop;
    const viewOffsetHeight = this.view.offsetHeight;
    this._characters.find(key => {
      const firstItem = this.firsts[key];
      const lastItem = this.lasts[key];
      const condition = (viewScrollTop <= firstItem.offsetTop &&
        (firstItem.offsetHeight + firstItem.offsetTop) < (viewScrollTop + viewOffsetHeight)) ||
        (viewScrollTop <= lastItem.offsetTop &&
          (lastItem.offsetHeight + lastItem.offsetTop) < (viewScrollTop + viewOffsetHeight));
      if (condition) {
        this._currentCharacterObserver.next(key);
        return condition;
      }
    });
  }

  /**Set size and position of indicator */
  private stylizeMainIndicator() {
    setTimeout(() => {
      const width = 0;
      let height = 0, top = 0, left = 0;
      height = this.view.offsetHeight;
      top = this.view.offsetTop;
      left = this.view.clientWidth - 1;
      this._mainIndicator.style.width = width + 'px';
      this._mainIndicator.style.top = (top + this._background.nativeElement.offsetHeight / 2) + 'px';
      this._mainIndicator.style.height = (height - this._background.nativeElement.offsetHeight) + 'px';
      this._mainIndicator.style.left = left + 'px';
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
      this._indicatorResponsible.classList.add('show');
      this._handleIndicatorTextFunctions[this.options.position]();
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      this._indicatorResponsible.classList.remove('show');
    }, duration);
    return timer;
  }

  ngAfterContentInit() {
    this.startCalculation();
    this._items.changes.subscribe(_ => {
      this.startCalculation();
    });
  }

  /**Process number of children and generate firsts and lasts objects */
  private startCalculation() {
    setTimeout(() => {
      this._numberOfItems = this._items.length;
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
      if (this.options.enable) {
        this._handleIndicatorTextFunctions[this.options.position]();
      }
    });
  }

  /**Scroll to a specific letter, positioned first of last. Returns the offsetTop if element found, else -1.
   * @param letter Character to which viewport should be scrolled
   * @param position Element of that character group, first or last
   */
  goToLetter(letter: string, position = 'first'): number {
    try {
      const offsetTop = this[position + 's'][letter.toUpperCase()].offsetTop;
      this.view.scrollTo({ top: offsetTop, behavior: 'smooth' });
      return offsetTop;
    } catch (e) {
      console.error('The letter you tried to scroll to, could not be found in list. Full error log can be found below:\n', e);
      return -1;
    }
  }

  /**If window is resized, restyle the indicator */
  @HostListener('window:resize')
  onresize() {
    if (this.options.enable) {
      this.stylizeMainIndicator();
    }
  }
}
