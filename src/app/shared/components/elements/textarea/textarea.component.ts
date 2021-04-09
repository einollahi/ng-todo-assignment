import { Component, Injector, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, FormControlDirective, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BaseFormField } from '../base-form-field';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: TextareaComponent, multi: true}
  ]
})
export class TextareaComponent extends BaseFormField {

  @Input() appearance: 'legacy' | 'standard' | 'fill' | 'outline' = 'legacy';
  @Input() placeholder: string;
  @Input() hint: string;
  
  constructor(public injector: Injector) {
    super(injector);
  }

  getErrorMessage() {
    if (this.control.hasError('required')) return 'this field is required.';
    if (this.control.hasError('pattern')) return 'the pattern is not correct';
  }

}
