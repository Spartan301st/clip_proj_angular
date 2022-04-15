import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// importing custom module
import { UserModule } from './user/user.module';
import { NavComponent } from './nav/nav.component';
// for firebase
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
// for firebase authentification
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// for firebase firestore
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@NgModule({
  declarations: [AppComponent, NavComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // indicating the custom module to be used
    UserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
