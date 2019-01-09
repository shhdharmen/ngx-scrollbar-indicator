import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { NgxScrollbarIndicatorModule, NgxScrollbarIndicatorComponent } from 'projects/ngx-scrollbar-indicator/src/public_api';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let component2: NgxScrollbarIndicatorComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let fixture2: ComponentFixture<NgxScrollbarIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxScrollbarIndicatorModule],
      declarations: [HomeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(() => {
    fixture2 = TestBed.createComponent(NgxScrollbarIndicatorComponent);
    component2 = fixture2.componentInstance;
    fixture2.detectChanges();
  });

  it('should create NgxScrollbarIndicatorComponent', () => {
    expect(component2).toBeTruthy();
  });
});
