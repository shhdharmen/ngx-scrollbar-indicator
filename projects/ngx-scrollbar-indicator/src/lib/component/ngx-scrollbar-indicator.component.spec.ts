import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ScrollbarIndicatorItemDirective } from '../directive/scrollbar-indicator-item.directive';
import { Component, ViewChild, DebugElement } from '@angular/core';
import {
  ScrollbarIndicatorOptions,
  ETheme,
  EShowWhen
} from '../interface/scrollbar-indicator-options';
import { DATA as MOCK_DATA } from '../MOCK_DATA';
import { By } from '@angular/platform-browser';
import { NgxScrollbarIndicatorComponent } from './ngx-scrollbar-indicator.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  template: `
    <ngx-scrollbar-indicator
      #indicatorRef
      [options]='options'
      class='container'
    >
      <div *ngFor='let item of DATA' [indicatorItem]='item.first_name'>
        {{ item.first_name }}
      </div>
    </ngx-scrollbar-indicator>
  `
})
class TestNgxScrollbarIndicatorComponent {
  options: ScrollbarIndicatorOptions = null;
  @ViewChild('indicatorRef') indicatorRef: NgxScrollbarIndicatorComponent;
  DATA = [{ first_name: 'Hello' }];
}

describe('NgxScrollbarIndicatorComponent', () => {
  const defaultOptions: ScrollbarIndicatorOptions = {
    enable: true,
    containerHeight: 500,
    showWhen: EShowWhen.scroll,
    theme: ETheme.waterDrop
  };
  const initialOptions: ScrollbarIndicatorOptions = {
    enable: true,
    containerHeight: 500,
    showWhen: EShowWhen.scroll,
    theme: ETheme.waterDrop
  };
  let component: NgxScrollbarIndicatorComponent;

  let hostComponent: TestNgxScrollbarIndicatorComponent;
  let hostFixture: ComponentFixture<TestNgxScrollbarIndicatorComponent>;

  let debugEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ScrollingModule],
      declarations: [
        NgxScrollbarIndicatorComponent,
        ScrollbarIndicatorItemDirective,
        TestNgxScrollbarIndicatorComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(
      TestNgxScrollbarIndicatorComponent
    );
    hostComponent = hostFixture.debugElement.componentInstance;
    debugEl = hostFixture.debugElement.query(By.css('.container'));

    component = hostComponent.indicatorRef;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have data', () => {
    expect(component.all.length).toBe(0);
  });

  it('should set data', () => {
    expect(component.all.length).not.toBe(hostComponent.DATA.length);
    hostFixture.detectChanges();
    hostFixture.whenStable().then(() => {
      expect(component.all.length).toBe(hostComponent.DATA.length);
    });
  });

  it('options should be undefined', () => {
    expect(JSON.stringify(component.options)).toBeUndefined();
  });

  it('assign blank options, it should take default options', () => {
    hostComponent.options = {};
    hostFixture.detectChanges();
    expect(JSON.stringify(component.options)).toBe(
      JSON.stringify(defaultOptions)
    );
  });

  it('assign set of options, it should take the same options', () => {
    hostComponent.options = Object.assign({}, initialOptions);
    hostFixture.detectChanges();
    expect(JSON.stringify(component.options)).toBe(
      JSON.stringify(initialOptions)
    );
  });

  it('change enable to false', () => {
    const options = Object.assign(defaultOptions, { enable: false });
    hostComponent.options = options;
    hostFixture.detectChanges();
    expect(JSON.stringify(component.options)).toBe(JSON.stringify(options));
  });

  it('change showWhen to always', () => {
    const options = Object.assign(defaultOptions, {
      showWhen: EShowWhen.always
    });
    hostComponent.options = options;
    hostFixture.detectChanges();
    expect(JSON.stringify(component.options)).toBe(JSON.stringify(options));
  });

  it('should scroll to a valid character', () => {
    // let's add some data
    hostComponent.DATA = MOCK_DATA;
    hostFixture.detectChanges();

    // let's verify if data is properly added
    hostFixture.whenStable().then(() => {
      component.scrollableElementRef.nativeElement.scrollTo({ top: 520 });
      hostFixture.whenRenderingDone().then(() => {
        expect(component.all.length).toBe(MOCK_DATA.length);

        // let's scroll
        component.goToLetter('A', 'last');
        hostFixture.whenRenderingDone().then(() => {
          // let's scroll to invalid char
          component.goToLetter('@', 'last');
          hostFixture.whenRenderingDone().then(() => { });
        });
      });
    });
  });
});
