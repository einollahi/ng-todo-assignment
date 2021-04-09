import { Component, Injector, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFormField } from '../base-form-field';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: CheckboxComponent, multi: true}
  ]
})
export class CheckboxComponent extends BaseFormField {
  @Input() checked: boolean;
  @Input() labelPosition: 'before' | 'after' = 'before';

  constructor(public injector: Injector) {
    super(injector);
  }

}
