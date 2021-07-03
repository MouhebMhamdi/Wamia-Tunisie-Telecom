import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarcComponent } from './navbarc.component';

describe('NavbarcComponent', () => {
  let component: NavbarcComponent;
  let fixture: ComponentFixture<NavbarcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
