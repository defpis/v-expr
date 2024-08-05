import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { INPUT_KEY } from '../../constants';

@Component({
  selector: 'app-context',
  templateUrl: './context.component.html',
  styleUrl: './context.component.scss',
})
export class ContextComponent {
  @Input() form: FormGroup;

  ngOnInit() {
    this.form.addControl('context', new FormControl('', [Validators.required]));
  }

  ngOnDestroy() {
    this.form.removeControl('context');
  }

  contexts = [
    {
      label: INPUT_KEY,
      value: INPUT_KEY,
    },
  ];
}
