import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilepComponent } from './profilep.component';

describe('ProfilepComponent', () => {
  let component: ProfilepComponent;
  let fixture: ComponentFixture<ProfilepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
