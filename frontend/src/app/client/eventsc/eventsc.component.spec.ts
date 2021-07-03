import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventscComponent } from './eventsc.component';

describe('EventscComponent', () => {
  let component: EventscComponent;
  let fixture: ComponentFixture<EventscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
