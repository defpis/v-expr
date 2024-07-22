import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-unary',
  templateUrl: './unary.component.html',
  styleUrl: './unary.component.scss',
})
export class UnaryComponent {
  @Input() form: FormGroup;

  get expr() {
    return this.form.get('expr') as FormGroup;
  }

  ngOnInit() {
    this.form.addControl('op', new FormControl('', [Validators.required]));
    this.form.addControl('expr', new FormGroup({}));
  }

  ngOnDestroy() {
    this.form.removeControl('op');
    this.form.removeControl('expr');
  }

  operators = [
    {
      label: '-',
      value: '-',
    },
    {
      label: '!',
      value: '!',
    },
  ];
}
