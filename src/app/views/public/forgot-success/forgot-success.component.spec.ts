import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotSuccessComponent } from './forgot-success.component';

describe('ForgotSuccessComponent', () => {
  let component: ForgotSuccessComponent;
  let fixture: ComponentFixture<ForgotSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
