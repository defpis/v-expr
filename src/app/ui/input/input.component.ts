import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as validators from '../validators';
import { inputKeyword } from '../constants';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() form: FormGroup;

  get input() {
    return this.form.get(inputKeyword) as FormControl;
  }

  ngOnInit() {
    this.form.addControl(
      inputKeyword,
      new FormControl('{}', [Validators.required, validators.json]),
    );
  }
}
