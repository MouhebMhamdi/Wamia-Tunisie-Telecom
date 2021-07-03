import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPartenaireComponent } from './header-partenaire.component';

describe('HeaderPartenaireComponent', () => {
  let component: HeaderPartenaireComponent;
  let fixture: ComponentFixture<HeaderPartenaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderPartenaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderPartenaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
