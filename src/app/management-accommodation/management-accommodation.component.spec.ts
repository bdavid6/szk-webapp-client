import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementAccommodationComponent } from './management-accommodation.component';

describe('ManagementAccommodationComponent', () => {
  let component: ManagementAccommodationComponent;
  let fixture: ComponentFixture<ManagementAccommodationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementAccommodationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementAccommodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
