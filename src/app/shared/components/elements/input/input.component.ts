import { Component, Injector, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFormField } from '../base-form-field';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: InputComponent, multi: true}
  ]
})
export class InputComponent extends BaseFormField {

  @Input() appearance: 'legacy' | 'standard' | 'fill' | 'outline' = 'legacy';
  @Input() placeholder: string;
  @Input() hint: string;
  @Input() maxlength: number | string;
  @Input() counter: number;
  
  constructor(public injector: Injector) {
    super(injector);
  }

  getErrorMessage() {
    if (this.control.hasError('required')) return this.label ? `تکمیل فیلد ${this.label} الزامی است.` : 'تکمیل این مورد الزامی است.';
    if (this.control.hasError('pattern')) return 'الگوی وارد شده صحیح نیست';
    if (this.control.hasError('minlength')) return 'الگوی وارد شده صحیح نیست';
    if (this.control.hasError('maxlength')) return 'الگوی وارد شده صحیح نیست';
  }

}
