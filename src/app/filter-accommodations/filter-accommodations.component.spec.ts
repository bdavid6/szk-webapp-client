import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAccommodationsComponent } from './filter-accommodations.component';

describe('FilterAccommodationsComponent', () => {
  let component: FilterAccommodationsComponent;
  let fixture: ComponentFixture<FilterAccommodationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterAccommodationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterAccommodationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
