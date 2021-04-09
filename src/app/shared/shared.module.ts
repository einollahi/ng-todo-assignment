import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// shared modules
import { MaterialsModule } from './modules/materials.module';
import { PipesModule } from './modules/pipes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// shared components
import { InputComponent } from './components/elements/input/input.component';
import { TextareaComponent } from './components/elements/textarea/textarea.component';
import { CheckboxComponent } from './components/elements/checkbox/checkbox.component';
import { SelectComponent } from './components/elements/select/select.component';

// business components

const sharedComponents: any[] = [
  InputComponent,
  TextareaComponent,
  CheckboxComponent,
  SelectComponent
];
const modules: any[]= [
  CommonModule,
  RouterModule,
  HttpClientModule,
  ReactiveFormsModule,
  NgbModule,
  MaterialsModule,
  PipesModule,
];
const business_components: any[] = [
];


@NgModule({
  imports: [...modules],
  declarations: [...sharedComponents, ...business_components],
  exports: [...modules, ...sharedComponents, ...business_components],
})
export class SharedModule {}