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
    label: ['', [Validators.required, Validators.minLength(20)]],
    mainImage: ['"src/assets/img/bg.jpg"', [Validators.required, Validators.minLength(3)]],
  });

  get name(): FormControl {
    return this.accommodationForm.get('name') as FormControl;
  }

  get place(): FormControl {
    return this.accommodationForm.get('place') as FormControl;
  }

  get label(): FormControl {
    return this.accommodationForm.get('label') as FormControl;
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

      this.clearForm();
      this.ns.showNotification(0, "Sikeres elküldés", 1000);
    } else {
      this.ns.showNotification(1, "Sikertelen elküldés", 1000);
    }
  }

  clearForm() {
    this.accommodationForm.reset({
          'name': '',
          'place': '',
          'label': '',
          'mainImage': '"src/assets/img/bg.jpg"'
         });
  }
}
