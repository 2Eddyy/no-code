import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridSquareComponent } from './grid-square.component';

describe('GridSquareComponent', () => {
  let component: GridSquareComponent;
  let fixture: ComponentFixture<GridSquareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridSquareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
