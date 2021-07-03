import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderierComponent } from './calenderier.component';

describe('CalenderierComponent', () => {
  let component: CalenderierComponent;
  let fixture: ComponentFixture<CalenderierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalenderierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalenderierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
