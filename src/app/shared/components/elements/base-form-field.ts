import { Component, Injector, Input, ViewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, FormControlDirective } from '@angular/forms';

@Component({
  template: '',
})
export abstract class BaseFormField implements ControlValueAccessor {
  @ViewChild(FormControlDirective, {static: true}) formControlDirective: FormControlDirective;

  @Input() formControl: FormControl;
  @Input() formControlName: string;
  @Input() required: boolean;
  @Input() label: string;
  @Input() icon: string;
  @Input() tooltip: string;
  @Input() tooltipPosition: string;
  @Input() tooltipHideDelay: number;
  @Input() tooltipShowDelay: number;
  @Input() set disabled(value: boolean) {
    value ? this.control.disable() : this.control.enable();
  }
  
  constructor(public injector: Injector) { }

  get control() {
    return this.formControl || this.controlContainer.control.get(this.formControlName);
  }

  private get controlContainer() {
    return this.injector.get(ControlContainer);
  }

  registerOnChange(fn: any): void {
    this.formControlDirective.valueAccessor.registerOnChange(fn);
  }

  registerOnTouched(fn: any): void {
    this.formControlDirective.valueAccessor.registerOnTouched(fn);
  }
  
  writeValue(obj: any): void {
    this.formControlDirective.valueAccessor.writeValue(obj);
  }

  setDisabledState(isDisabled: boolean): void {
    this.formControlDirective.valueAccessor.setDisabledState(isDisabled);
  }

}
