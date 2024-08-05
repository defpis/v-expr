import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as validators from '../../validators';
import { INPUT_KEY } from '../../constants';

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
        type: new FormControl('context', [Validators.required]),
        context: new FormControl(INPUT_KEY, [Validators.required]),
      }),
    );
    this.form.addControl('path', new FormGroup({}));
  }

  ngOnDestroy() {
    this.form.removeControl('object');
    this.form.removeControl('path');
  }
}
