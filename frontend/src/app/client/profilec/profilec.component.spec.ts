import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilecComponent } from './profilec.component';

describe('ProfilecComponent', () => {
  let component: ProfilecComponent;
  let fixture: ComponentFixture<ProfilecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
