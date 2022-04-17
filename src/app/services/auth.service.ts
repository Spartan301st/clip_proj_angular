import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import IUser from '../models/user.model';
import { Observable, of } from 'rxjs';
import { map, delay, filter, switchMap } from 'rxjs/operators';
//
import { Router } from '@angular/router';
//
import { ActivatedRoute, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersColleciton: AngularFirestoreCollection<IUser>;
  public isAuthenticated$: Observable<boolean>;
  public isAuthenticatedWithDelay$: Observable<boolean>;
  private redirect = false;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.usersColleciton = db.collection('users');
    // auth.user.subscribe(console.log);
    // as user will return a User observable or null we can use pipeable operators to transform them to a final boolean output
    this.isAuthenticated$ = auth.user.pipe(map((user) => !!user));
    // for delayed authentification so that we can calmly close the modal
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(delay(1000));
    //
    // this.route.data.subscribe(console.log);
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        map((e) => this.route.firstChild),
        switchMap((route) => route?.data ?? of({}))
      )
      .subscribe((data) => {
        this.redirect = data['authOnly'] ?? false;
      });
  }

  // for creating the users using firebase
  public async createUser(userData: IUser) {
    // handling the empty password error
    if (!userData.password) {
      throw new Error('Password not provided!');
    }
    const userCred = await this.auth.createUserWithEmailAndPassword(
      userData.email,
      userData.password
    );
    // console.log(userCred);
    // initially as we don't have the users collection it would be auto created for us, and later the documents would be added to already existing collection
    // await this.db.collection<IUser>('users').add({
    //   name: userData.name,
    //   email: userData.email,
    //   age: userData.age,
    //   phoneNumber: userData.phoneNumber,
    // });

    if (!userCred.user) {
      throw new Error("User can't be found");
    }
    // we have defined a stricter rule for writing to DB, but as firebase will save our token, the user will auto be regarded as auth after the registration and can make write request
    await this.usersColleciton.doc(userCred.user.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber,
    });

    // setting the diplay  name
    await userCred.user.updateProfile({
      displayName: userData.name,
    });
  }

  public async logout($event?: Event) {
    if ($event) {
      $event.preventDefault();
    }
    // await this.afAuth.signOut();
    await this.auth.signOut();
    // for redirecting the user after the logout
    if (this.redirect) {
      await this.router.navigateByUrl('/');
    }
  }
}
