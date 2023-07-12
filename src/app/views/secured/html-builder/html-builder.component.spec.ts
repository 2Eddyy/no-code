import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlBuilderComponent } from './html-builder.component';

describe('HtmlBuilderComponent', () => {
  let component: HtmlBuilderComponent;
  let fixture: ComponentFixture<HtmlBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HtmlBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HtmlBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
