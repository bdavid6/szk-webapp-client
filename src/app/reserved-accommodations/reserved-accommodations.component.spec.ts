import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedAccommodationsComponent } from './reserved-accommodations.component';

describe('ReservedAccommodationsComponent', () => {
  let component: ReservedAccommodationsComponent;
  let fixture: ComponentFixture<ReservedAccommodationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservedAccommodationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservedAccommodationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
