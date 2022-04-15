import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: '',
  };

  showAlert = false;
  alertMsg = 'Please wait till we log you in...';
  alertColor = 'blue';
  inSubmission = false;

  constructor(private auth: AngularFireAuth) {}

  ngOnInit(): void {}
  async login() {
    this.showAlert = true;
    this.alertMsg = 'Please wait till we log you in...';
    this.alertColor = 'blue';
    this.inSubmission = true;
    // console.log(this.credentials);

    try {
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email,
        this.credentials.password
      );
    } catch (error) {
      this.inSubmission = false;
      this.alertMsg = 'An unexpected error has occured. Plz try again later';
      this.alertColor = 'red';

      console.error(error);

      return;
    }

    this.alertMsg = "You're now successfully logged in.";
    this.alertColor = 'green';
  }
}
