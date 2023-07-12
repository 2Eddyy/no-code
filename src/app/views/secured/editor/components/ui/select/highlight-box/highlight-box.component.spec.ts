import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightBoxComponent } from './highlight-box.component';

describe('HighlightBoxComponent', () => {
  let component: HighlightBoxComponent;
  let fixture: ComponentFixture<HighlightBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighlightBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
