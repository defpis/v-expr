import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import * as validators from '../../validators';

@Component({
  selector: 'app-binary',
  templateUrl: './binary.component.html',
  styleUrl: './binary.component.scss',
})
export class BinaryComponent {
  @Input() form: FormGroup;

  get expr() {
    return this.form.get('expr') as FormGroup;
  }

  get operations() {
    return this.form.get('operations') as FormArray;
  }

  ngOnInit() {
    this.form.addControl('expr', new FormGroup({}));
    this.form.addControl(
      'operations',
      new FormArray([
        new FormGroup({
          op: new FormControl('', [Validators.required]),
          expr: new FormGroup({}),
        }),
      ]),
    );
  }

  ngOnDestroy() {
    this.form.removeControl('expr');
    this.form.removeControl('operations');
  }

  operators = [
    // calculate
    {
      label: '+',
      value: '+',
    },
    {
      label: '-',
      value: '-',
    },
    {
      label: '*',
      value: '*',
    },
    {
      label: '/',
      value: '/',
    },

    // compare
    {
      label: '>',
      value: '>',
    },
    {
      label: '>=',
      value: '>=',
    },
    {
      label: '<',
      value: '<',
    },
    {
      label: '<=',
      value: '<=',
    },
    {
      label: '==',
      value: '==',
    },
    {
      label: '!=',
      value: '!=',
    },

    // logic
    {
      label: '&&',
      value: '&&',
    },
    {
      label: '||',
      value: '||',
    },
  ];

  get isLast() {
    return this.operations.controls.length === 1;
  }

  add() {
    this.operations.push(
      new FormGroup({
        op: new FormControl('', [Validators.required]),
        expr: new FormGroup({}),
      }),
    );
  }

  remove(i: number) {
    if (this.isLast) return;
    this.operations.removeAt(i);
  }
}
