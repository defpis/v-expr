import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import * as validators from '../../validators';

@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
  styleUrl: './condition.component.scss',
})
export class ConditionComponent {
  @Input() form: FormGroup;

  get ifThenExprs() {
    return this.form.get('ifThenExprs') as FormArray;
  }

  get elseExpr() {
    return this.form.get('elseExpr') as FormGroup;
  }

  get elseDisabled() {
    return this.form.get('elseDisabled') as FormControl;
  }

  ngOnInit() {
    this.form.addControl(
      'ifThenExprs',
      new FormArray([
        new FormGroup({
          ifExpr: new FormGroup({}),
          thenExpr: new FormGroup({}),
        }),
      ]),
    );
    this.form.addControl(
      'elseExpr',
      new FormGroup({
        type: new FormControl('primary', [Validators.required]),
        value: new FormControl('false', [Validators.required, validators.json]),
      }),
    );
    this.form.addControl(
      'elseDisabled',
      new FormControl(false, [Validators.required]),
    );
  }

  ngOnDestroy() {
    this.form.removeControl('ifThenExprs');
    this.form.removeControl('elseExpr');
    this.form.removeControl('elseDisabled');
  }

  add() {
    this.ifThenExprs.push(
      new FormGroup({
        ifExpr: new FormGroup({}),
        thenExpr: new FormGroup({}),
      }),
    );
  }

  get isLast() {
    return this.ifThenExprs.controls.length === 1;
  }

  remove(i: number) {
    if (this.isLast) return;
    this.ifThenExprs.removeAt(i);
  }

  toggle() {
    this.elseDisabled.setValue(!this.elseDisabled.value);
  }
}
