import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NgxScrollbarIndicatorComponent } from './ngx-scrollbar-indicator.component';

describe('NgxScrollbarIndicatorComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NgxScrollbarIndicatorComponent
      ]
    }).compileComponents();
  }));
  let fixture: ComponentFixture<NgxScrollbarIndicatorComponent>;
  it('should create the NgxScrollbarIndicatorComponent', () => {
    fixture = TestBed.createComponent(NgxScrollbarIndicatorComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
