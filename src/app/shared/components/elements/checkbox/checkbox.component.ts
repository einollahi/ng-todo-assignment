import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
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
  @Input() indeterminate: boolean | null;
  @Output() onChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public injector: Injector) {
    super(injector);
  }

  onChangeCheckbox(value: boolean) {
    if (this.indeterminate === undefined) {
      this.onChange.emit(value);
      return;
    };
    if (this.indeterminate) {
      this.indeterminate = false;
      this.control.setValue(true)
    } else {
      if (this.indeterminate === false) {
        this.indeterminate = null;
        this.control.setValue(false)
      } else {
        this.indeterminate = true;
        this.control.setValue(null)
      }
    }
    this.onChange.emit(this.control.value);
  }
}
