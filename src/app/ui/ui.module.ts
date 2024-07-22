import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiComponent } from './ui.component';
import { InputComponent } from './input/input.component';
import { ExprComponent } from './expr/expr.component';
import { PrimaryComponent } from './expr/primary/primary.component';
import { UnaryComponent } from './expr/unary/unary.component';
import { BinaryComponent } from './expr/binary/binary.component';
import { GetterComponent } from './expr/getter/getter.component';
import { ConditionComponent } from './expr/condition/condition.component';
import { formGroupPipe } from './form.pipe';
import { OutputComponent } from './output/output.component';

@NgModule({
  declarations: [
    formGroupPipe,
    UiComponent,
    InputComponent,
    ExprComponent,
    PrimaryComponent,
    UnaryComponent,
    BinaryComponent,
    GetterComponent,
    ConditionComponent,
    OutputComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class UiModule {}
