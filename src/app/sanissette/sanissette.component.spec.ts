import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SanissetteComponent } from './sanissette.component';

describe('SanissetteComponent', () => {
  let component: SanissetteComponent;
  let fixture: ComponentFixture<SanissetteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SanissetteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SanissetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
