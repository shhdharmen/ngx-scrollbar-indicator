import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { ScrollbarIndicatorItemDirective } from "../directive/scrollbar-indicator-item.directive";
import { Component, ViewChild, DebugElement } from "@angular/core";
import {
  ScrollbarIndicatorOptions,
  EChangeWhen,
  ETheme,
  EPosition,
  EShowWhen
} from "../interface/scrollbar-indicator-options";
import { DATA as MOCK_DATA } from "../MOCK_DATA";
import { By } from "@angular/platform-browser";
import { NgxScrollbarIndicatorCdkComponent } from "./ngx-scrollbar-indicator.component";
import { ScrollingModule } from "@angular/cdk/scrolling";

@Component({
  template: `
    <ngx-scrollbar-indicator-cdk
      #indicatorRef
      [options]="options"
      class="container"
    >
      <div *ngFor="let item of DATA" [indicatorItem]="item.first_name">
        {{ item.first_name }}
      </div>
    </ngx-scrollbar-indicator-cdk>
  `
})
class TestNgxScrollbarIndicatorCdkComponent {
  options: ScrollbarIndicatorOptions = null;
  @ViewChild("indicatorRef") indicatorRef: NgxScrollbarIndicatorCdkComponent;
  DATA = [{ first_name: "Hello" }];
}

describe("NgxScrollbarIndicatorCdkComponent", () => {
  const defaultOptions = {
    enable: true,
    changeWhen: EChangeWhen.top,
    containerHeight: 500,
    position: EPosition.auto,
    showWhen: EShowWhen.scroll,
    theme: ETheme.waterDrop
  };
  const initialOptions = {
    enable: true,
    changeWhen: EChangeWhen.top,
    containerHeight: 350,
    theme: ETheme.waterDrop,
    position: EPosition.auto,
    showWhen: EShowWhen.scroll
  };
  let component: NgxScrollbarIndicatorCdkComponent;

  let hostComponent: TestNgxScrollbarIndicatorCdkComponent;
  let hostFixture: ComponentFixture<TestNgxScrollbarIndicatorCdkComponent>;

  let debugEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ScrollingModule],
      declarations: [
        NgxScrollbarIndicatorCdkComponent,
        ScrollbarIndicatorItemDirective,
        TestNgxScrollbarIndicatorCdkComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(
      TestNgxScrollbarIndicatorCdkComponent
    );
    hostComponent = hostFixture.debugElement.componentInstance;
    debugEl = hostFixture.debugElement.query(By.css(".container"));

    component = hostComponent.indicatorRef;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should not have data", () => {
    expect(component.all.length).toBe(0);
  });

  it("should set data", () => {
    expect(component.all.length).not.toBe(hostComponent.DATA.length);
    hostFixture.detectChanges();
    hostFixture.whenStable().then(() => {
      expect(component.all.length).toBe(hostComponent.DATA.length);
    });
  });

  it("options should be undefined", () => {
    expect(JSON.stringify(component.options)).toBeUndefined();
  });

  it("assign blank options, it should take default options", () => {
    hostComponent.options = {};
    hostFixture.detectChanges();
    expect(JSON.stringify(component.options)).toBe(
      JSON.stringify(defaultOptions)
    );
  });

  it("assign set of options, it should take the same options", () => {
    hostComponent.options = Object.assign({}, initialOptions);
    hostFixture.detectChanges();
    expect(JSON.stringify(component.options)).toBe(
      JSON.stringify(initialOptions)
    );
  });

  it("change enable to false", () => {
    const options = Object.assign(defaultOptions, { enable: false });
    hostComponent.options = options;
    hostFixture.detectChanges();
    expect(JSON.stringify(component.options)).toBe(JSON.stringify(options));
  });

  it("change position of indicator to top", () => {
    const options = Object.assign(defaultOptions, { position: EPosition.top });
    hostComponent.options = options;
    hostFixture.detectChanges();
    expect(JSON.stringify(component.options)).toBe(JSON.stringify(options));
  });

  it("change changeWhen to visible", () => {
    const options = Object.assign(defaultOptions, {
      changeWhen: EChangeWhen.visible
    });
    hostComponent.options = options;
    hostFixture.detectChanges();
    expect(JSON.stringify(component.options)).toBe(JSON.stringify(options));
  });

  it("change showWhen to always", () => {
    const options = Object.assign(defaultOptions, {
      showWhen: EShowWhen.always
    });
    hostComponent.options = options;
    hostFixture.detectChanges();
    expect(JSON.stringify(component.options)).toBe(JSON.stringify(options));
  });

  it("should scroll to a valid character", () => {
    // let's add some data
    hostComponent.DATA = MOCK_DATA;
    hostFixture.detectChanges();

    // let's verify if data is properly added
    hostFixture.whenStable().then(() => {
      component.scrollableElementRef.nativeElement.scrollTo({ top: 520 });
      hostFixture.whenRenderingDone().then(() => {
        expect(component.all.length).toBe(MOCK_DATA.length);

        // let's scroll
        component.goToLetter("A", "last");
        hostFixture.whenRenderingDone().then(() => {
          // let's scroll to invalid char
          component.goToLetter("@", "last");
          hostFixture.whenRenderingDone().then(() => {});
        });
      });
    });
  });
});
