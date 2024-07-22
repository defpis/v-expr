import { Component, HostListener, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-expr',
  templateUrl: './expr.component.html',
  styleUrl: './expr.component.scss',
})
export class ExprComponent {
  static id = 0;
  static ids: number[] = [];
  id = ExprComponent.id++;

  @Input() form: FormGroup;

  get visible() {
    const id = ExprComponent.ids[ExprComponent.ids.length - 1];
    const hovered = this.id === id;
    return !this.type.value || hovered;
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter() {
    ExprComponent.ids.push(this.id);
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave() {
    ExprComponent.ids.pop();
  }

  get type() {
    return this.form.get('type') as FormControl;
  }

  ngOnInit() {
    this.form.addControl('type', new FormControl('', [Validators.required]));
  }

  ngOnDestroy() {
    this.form.removeControl('type');
  }

  types = [
    {
      label: 'primary',
      value: 'primary',
    },
    {
      label: 'unary',
      value: 'unary',
    },
    {
      label: 'binary',
      value: 'binary',
    },
    {
      label: 'getter',
      value: 'getter',
    },
    {
      label: 'condition',
      value: 'condition',
    },
  ];
}
