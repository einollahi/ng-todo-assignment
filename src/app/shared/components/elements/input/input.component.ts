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
    if (this.control.hasError('required')) return 'this field is required.';
    if (this.control.hasError('pattern')) return 'the pattern is not correct';
  }

}
