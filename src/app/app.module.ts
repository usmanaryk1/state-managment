import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Store } from './store';
import { AppComponent } from './app.component';
import { SongsModule } from './songs/songs.module';

export const api= "http://localhost:3000";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SongsModule
  ],
  providers: [
    Store,
    {provide:'BaseURL', useValue:api }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
