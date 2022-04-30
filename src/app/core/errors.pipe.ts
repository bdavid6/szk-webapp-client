import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'appErrors'
})
export class ErrorsPipe implements PipeTransform {

  transform(value: ValidationErrors): string {
    if (value.required) {
      return 'Mező kitöltése kötelező.';
    }
    if (value.minlength) {
      return `Mimumum
        ${value.minlength.requiredLength} karakter hosszú legyen.`;
    }
    return JSON.stringify(value);
  }

}