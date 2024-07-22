import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Pipe({ name: 'formGroup' })
export class formGroupPipe implements PipeTransform {
  transform(control: AbstractControl, key: string): FormGroup {
    return control.get(key) as FormGroup;
  }
}
