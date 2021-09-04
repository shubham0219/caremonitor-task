import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaremonitorAgeGroupComponent } from './caremonitor-age-group.component';

describe('CaremonitorAgeGroupComponent', () => {
  let component: CaremonitorAgeGroupComponent;
  let fixture: ComponentFixture<CaremonitorAgeGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaremonitorAgeGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaremonitorAgeGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
