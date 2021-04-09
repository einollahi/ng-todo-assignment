import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { LoaderComponent } from './layout/loader/loader.component';
import { NavComponent } from './layout/nav/nav.component';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);

import { StartupService } from './shared/services/startup.service';
import { TodoComponent } from './page/components/todo/todo.component';

export function startupService(startupService: StartupService) {
  return () => startupService.load();
}

@NgModule({
  declarations: [
    AppComponent, LoaderComponent, NavComponent, TodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: startupService, deps: [StartupService], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
