import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as validators from '../../validators';

@Component({
  selector: 'app-getter',
  templateUrl: './getter.component.html',
  styleUrl: './getter.component.scss',
})
export class GetterComponent {
  @Input() form: FormGroup;

  get object() {
    return this.form.get('object') as FormGroup;
  }

  get path() {
    return this.form.get('path') as FormGroup;
  }

  ngOnInit() {
    this.form.addControl(
      'object',
      new FormGroup({
        type: new FormControl('primary', [Validators.required]),
        value: new FormControl('#input', [
          Validators.required,
          validators.json,
        ]),
      }),
    );
    this.form.addControl('path', new FormGroup({}));
  }

  ngOnDestroy() {
    this.form.removeControl('object');
    this.form.removeControl('path');
  }
}
