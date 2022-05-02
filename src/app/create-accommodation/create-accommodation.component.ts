import { Component, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccommodationService } from '../core/services/accommodation.service';
import { NotificationService } from '../core/services/notification.service';

@Component({
  selector: 'app-create-accommodation',
  templateUrl: './create-accommodation.component.html',
  styleUrls: ['./create-accommodation.component.scss']
})
export class CreateAccommodationComponent implements OnInit {

  accommodationForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    place: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(20)]],
    technical_description: [''],
    adult_price: ['', Validators.required],
    child_price: ['', Validators.required],
  });

  get name(): FormControl {
    return this.accommodationForm.get('name') as FormControl;
  }

  get place(): FormControl {
    return this.accommodationForm.get('place') as FormControl;
  }

  get description(): FormControl {
    return this.accommodationForm.get('description') as FormControl;
  }

  get technical_description(): FormControl {
    return this.accommodationForm.get('technical_description') as FormControl;
  }

  get adult_price(): FormControl {
    return this.accommodationForm.get('place') as FormControl;
  }

  get child_price(): FormControl {
    return this.accommodationForm.get('place') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private as: AccommodationService,
    private ns: NotificationService

  ) { }

  ngOnInit(): void {
  }

  async submitCreate(): Promise<void> {
    this.accommodationForm.markAllAsTouched();
    if (this.accommodationForm.valid) {
      await this.as.createAccommodation(this.accommodationForm.value);

      //this.clearForm();
      this.accommodationForm.reset();
      this.ns.showNotification(0, "Sikeres elküldés", 1000);
    } else {
      //this.ns.showNotification(1, "Sikertelen elküldés", 1000);
    }
  }

  clearForm() {
    this.accommodationForm.reset({
          'name': '',
          'place': '',
          'description': '',
          'technical_description': '',
          'adult_price': '',
          'child_price': '',
         });
  }
}
