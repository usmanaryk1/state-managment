import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Store } from './store';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    Store
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
