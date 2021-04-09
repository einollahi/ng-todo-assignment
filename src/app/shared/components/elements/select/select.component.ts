import { Component, EventEmitter, Injector, Input, Output, ViewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, FormControlDirective, NG_VALUE_ACCESSOR } from '@angular/forms';
import { KeyValue } from '@angular/common';
import { BaseFormField } from '../base-form-field';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: SelectComponent, multi: true}
  ]
})
export class SelectComponent extends BaseFormField {

  @Input() appearance: 'legacy' | 'standard' | 'fill' | 'outline' = 'legacy';
  @Input() multiple: boolean;
  @Input() hint: string;
  @Input() bindValue: string;
  @Input() bindLabel: string;
  @Input() placeholder: string;

  @Input() list: KeyValue<number, string>[] | any[];
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(public injector: Injector) {
    super(injector);
  }

  getErrorMessage() {
    if (this.control.hasError('required')) return 'this field is required.';
    if (this.control.hasError('pattern')) return 'the pattern is not correct';
  }

  onSelectionChange(value: string) {
    this.onChange.emit(value)
  }

}
