import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Interpreter } from './interpreter';
import { debounce } from 'lodash';
import { Subject, Subscription } from 'rxjs';
import { inputKeyword } from './constants';
import * as validators from './validators';

const defaultEnv = {
  [inputKeyword]: new FormControl(
    JSON.stringify({ a: 1, b: 2, c: 3 }, null, 2),
    [Validators.required, validators.json],
  ),
};

const defaultExpr = {
  type: new FormControl('condition', [Validators.required]),
  ifThenExprs: new FormArray([
    new FormGroup({
      ifExpr: new FormGroup({
        type: new FormControl('unary', [Validators.required]),
        op: new FormControl('!', [Validators.required]),
        expr: new FormGroup({
          type: new FormControl('getter', [Validators.required]),
          object: new FormGroup({
            type: new FormControl('primary', [Validators.required]),
            value: new FormControl('#input', [
              Validators.required,
              validators.json,
            ]),
          }),
          path: new FormGroup({
            type: new FormControl('primary', [Validators.required]),
            value: new FormControl('"a"', [
              Validators.required,
              validators.json,
            ]),
          }),
        }),
      }),
      thenExpr: new FormGroup({
        type: new FormControl('getter', [Validators.required]),
        object: new FormGroup({
          type: new FormControl('primary', [Validators.required]),
          value: new FormControl('#input', [
            Validators.required,
            validators.json,
          ]),
        }),
        path: new FormGroup({
          type: new FormControl('primary', [Validators.required]),
          value: new FormControl('"c"', [Validators.required, validators.json]),
        }),
      }),
    }),

    new FormGroup({
      ifExpr: new FormGroup({
        type: new FormControl('binary', [Validators.required]),
        expr: new FormGroup({
          type: new FormControl('getter', [Validators.required]),
          object: new FormGroup({
            type: new FormControl('primary', [Validators.required]),
            value: new FormControl('#input', [
              Validators.required,
              validators.json,
            ]),
          }),
          path: new FormGroup({
            type: new FormControl('primary', [Validators.required]),
            value: new FormControl('"b"', [
              Validators.required,
              validators.json,
            ]),
          }),
        }),
        operations: new FormArray([
          new FormGroup({
            op: new FormControl('*', [Validators.required]),
            expr: new FormGroup({
              type: new FormControl('primary', [Validators.required]),
              value: new FormControl('25', [
                Validators.required,
                validators.json,
              ]),
            }),
          }),
          new FormGroup({
            op: new FormControl('-', [Validators.required]),
            expr: new FormGroup({
              type: new FormControl('primary', [Validators.required]),
              value: new FormControl('100', [
                Validators.required,
                validators.json,
              ]),
            }),
          }),
          new FormGroup({
            op: new FormControl('/', [Validators.required]),
            expr: new FormGroup({
              type: new FormControl('primary', [Validators.required]),
              value: new FormControl('2', [
                Validators.required,
                validators.json,
              ]),
            }),
          }),
        ]),
      }),
      thenExpr: new FormGroup({
        type: new FormControl('primary', [Validators.required]),
        value: new FormControl('0.01', [Validators.required, validators.json]),
      }),
    }),
  ]),
  elseExpr: new FormGroup({
    type: new FormControl('primary', [Validators.required]),
    value: new FormControl('"Hello World!"', [
      Validators.required,
      validators.json,
    ]),
  }),
};

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrl: './ui.component.scss',
})
export class UiComponent {
  form = new FormGroup({
    env: new FormGroup({ ...defaultEnv }),
    expr: new FormGroup({ ...defaultExpr }),
  });

  subscription = new Subscription();
  result$ = new Subject();

  ngOnInit() {
    this.subscription.add(
      this.form.valueChanges.subscribe(debounce(this.onChange, 500)),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get env() {
    return this.form.get('env') as FormGroup;
  }

  get expr() {
    return this.form.get('expr') as FormGroup;
  }

  onChange = () => {
    // https://github.com/angular/angular/issues/10530
    // if (this.form.invalid) {
    //   console.log(this.form.errors); // null
    // }

    if (this.form.valid) {
      const interpreter = new Interpreter(this.form.value.env);

      const ast = this.form.value.expr;
      console.log('Ast: ', ast);

      try {
        const ret = interpreter.evaluate(ast);
        const data = JSON.stringify(ret, null, 2);
        console.log('Result: ', data);
        this.result$.next({ status: 'success', data });
      } catch (err) {
        console.log('Error: ', err);
        this.result$.next({ status: 'error', data: err });
      }
    } else {
      this.result$.next({ status: 'pending', data: 'waiting...' });
    }
  };
}
