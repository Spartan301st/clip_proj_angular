import { Component, OnInit } from '@angular/core';
// for form functionality
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
// export class RegisterComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }
// }
export class RegisterComponent {
  constructor(private auth: AuthService) {}
  // for tracking whether the form is being submitted
  inSubmittion = false;
  // new form controls
  // making name field required with min input length of 3
  name = new FormControl('', [
    // from validators
    Validators.required,
    // we can use the html attribute for validation as well
    Validators.minLength(3),
  ]);
  email = new FormControl('', [Validators.required, Validators.email]);
  age = new FormControl('', [
    Validators.required,
    Validators.min(18),
    Validators.max(128),
  ]);
  password = new FormControl('', [
    Validators.required,
    // Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
  ]);
  confirm_password = new FormControl('', [Validators.required]);
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13),
  ]);

  // determining whether to show a submition alert or not
  showAlert = false;
  alertMsg = 'Creating your account...';
  alertColor = 'blue';

  // grouping forms
  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phoneNumber: this.phoneNumber,
  });

  // reseting the alert to its default values
  // register() {
  //   this.showAlert = true;
  //   this.alertMsg = 'Creating your account...';
  //   this.alertColor = 'blue';
  // }

  // registering user with the firebase
  async register() {
    this.inSubmittion = true;

    this.showAlert = true;
    this.alertMsg = 'Creating your account...';
    this.alertColor = 'blue';

    // const { email, password } = this.registerForm.value;

    try {
      await this.auth.createUser(this.registerForm.value);
    } catch (err) {
      console.error(err);
      this.alertMsg = 'An unexpected error occured. Plz try again later';
      this.alertColor = 'red';
      this.inSubmittion = false;
      return;
    }

    this.alertMsg = 'Success! Your account has been created';
    this.alertColor = 'green';
  }

  // we used constructor to check for name type; we don't need it now
  // constructor() {
  //   // this.registerForm.controls['name']
  //   // now name type is FormControl
  //   this.name
  // }
}
