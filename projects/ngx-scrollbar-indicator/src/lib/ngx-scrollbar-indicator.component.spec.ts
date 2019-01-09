import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NgxScrollbarIndicatorComponent } from './ngx-scrollbar-indicator.component';

describe('NgxScrollbarIndicatorComponent', () => {
  let fixture: ComponentFixture<NgxScrollbarIndicatorComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NgxScrollbarIndicatorComponent
      ]
    }).compileComponents();
  }));
  it('should create', () => {
    fixture = TestBed.createComponent(NgxScrollbarIndicatorComponent);
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
