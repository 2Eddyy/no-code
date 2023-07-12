import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectActionsComponent } from './select-actions.component';

describe('SelectActionsComponent', () => {
  let component: SelectActionsComponent;
  let fixture: ComponentFixture<SelectActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
