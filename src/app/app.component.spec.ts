import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgxScrollbarIndicatorModule } from 'projects/ngx-scrollbar-indicator/src/public_api';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxScrollbarIndicatorModule
      ],
      declarations: [
        AppComponent
      ]
    }).compileComponents();
  }));
  let fixture: ComponentFixture<AppComponent>;
  it('should create the app', () => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should call ngOnInit method and data length must be 1003', () => {
    fixture.componentInstance.ngOnInit();
    expect(fixture.componentInstance.DATA.length).toBe(1003);
  });
});
