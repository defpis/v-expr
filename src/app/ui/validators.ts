import { AbstractControl, ValidationErrors } from '@angular/forms';
import { keywords } from './constants';

export function json(control: AbstractControl): ValidationErrors | null {
  if (control.value.startsWith('#')) {
    const keyword = control.value.slice(1);
    if (keywords.includes(keyword)) {
      return null;
    }
  }

  try {
    JSON.parse(control.value);
  } catch (err) {
    return { 'invalid json': true };
  }
  return null;
}
