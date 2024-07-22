import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as validators from '../../validators';

@Component({
  selector: 'app-primary',
  templateUrl: './primary.component.html',
  styleUrl: './primary.component.scss',
})
export class PrimaryComponent {
  @Input() form: FormGroup;

  get value() {
    return this.form.get('value') as FormControl;
  }

  ngOnInit() {
    this.form.addControl(
      'value',
      new FormControl('', [Validators.required, validators.json]),
    );
  }

  ngOnDestroy() {
    this.form.removeControl('value');
  }
}
