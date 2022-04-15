import { ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';
export class RegisterValidators {
  static match(controlName: string, matchingControlName: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const control = group.get(controlName);
      const matchingControl = group.get(matchingControlName);

      // to inform the devs about that one or both input values for password fields a re empty
      if (!control || !matchingControl) {
        console.error(`Form controls can't be found in the form group`);
        return { controlNotFound: false };
      }

      // to inform the devs about that values in the password fields don't match
      const error =
        control.value === matchingControl.value ? null : { noMatch: true };

      // manually passing the error to control
      matchingControl.setErrors(error);

      return error;
    };
  }
}
