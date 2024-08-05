import { AbstractControl, ValidationErrors } from '@angular/forms';

export function json(control: AbstractControl): ValidationErrors | null {
  try {
    JSON.parse(control.value);
  } catch (err) {
    return { 'invalid json': true };
  }
  return null;
}
