import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesByAgeGroupComponent } from './cases-by-age-group.component';

describe('CasesByAgeGroupComponent', () => {
  let component: CasesByAgeGroupComponent;
  let fixture: ComponentFixture<CasesByAgeGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasesByAgeGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesByAgeGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
