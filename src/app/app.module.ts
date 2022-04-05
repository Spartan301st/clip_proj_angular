import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
// importing custom module
import {UserModule} from './user/user.module';
import {NavComponent} from './nav/nav.component';
import {Rando2mComponent} from './random/rando2m.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    Rando2mComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // indicating the custom module to be used
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
