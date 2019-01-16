import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseAngularCdkComponent } from './use-angular-cdk.component';

describe('UseAngularCdkComponent', () => {
  let component: UseAngularCdkComponent;
  let fixture: ComponentFixture<UseAngularCdkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseAngularCdkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseAngularCdkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
