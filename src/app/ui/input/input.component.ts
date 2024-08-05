import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as validators from '../validators';
import { INPUT_KEY } from '../constants';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() form: FormGroup;

  get input() {
    return this.form.get(INPUT_KEY) as FormControl;
  }

  ngOnInit() {
    this.form.addControl(
      INPUT_KEY,
      new FormControl('{}', [Validators.required, validators.json]),
    );
  }

  ngOnDestroy() {
    this.form.removeControl(INPUT_KEY);
  }
}
