import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypositionComponent } from './myposition.component';

describe('MypositionComponent', () => {
  let component: MypositionComponent;
  let fixture: ComponentFixture<MypositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
