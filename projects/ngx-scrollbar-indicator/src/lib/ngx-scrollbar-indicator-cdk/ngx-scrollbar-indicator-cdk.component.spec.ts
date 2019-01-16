import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxScrollbarIndicatorCdkComponent } from './ngx-scrollbar-indicator-cdk.component';

describe('NgxScrollbarIndicatorCdkComponent', () => {
  let component: NgxScrollbarIndicatorCdkComponent;
  let fixture: ComponentFixture<NgxScrollbarIndicatorCdkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxScrollbarIndicatorCdkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxScrollbarIndicatorCdkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
