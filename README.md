# Clips

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Description of the Section 11:

In this section we where working on confirming that password and confirm_password fields match, and if not inform the user about that. Plus we've added the functionality of checking whether the email was already registered in Firebase. For all of that we used both sync and async custom validators.

## Topics covered in Section 11:

- Custom validators
- using ng g class subcommand
- static props and methods
- Passing custom validators directly to FormGroup
- Factory functions + ValidatorFn interface
- setErrors method for addign errors manually
- async validators + AsyncValidator interface
- making a simple class injectable with @Injectable

## Notes for the entire Section 11:

### vid.164

Firebase will reject the users registration if there is already an account with the given email. To inform the user about this issue we should create custom validators.
Custom validators can be defined as classes or functions. Angular will supply the validators with the access to FormControl. as a result validators will have access to the value to perform the validation. During the dev of this validator we might attempt to add it to confirmPasswordFormControl but we will also need an access to passwordFormControl, which can be tricky. The better approach would be to add validator to FormGroup itself directly. By doing so we'll be given access to all formControls registered in a group. Whenever you design a validator that needs access to multiple controls consider designing it in a way that has access to the formGroup. Using ng g class subcommand will generate an empty class for us. It'll create 2 files one of which is a test file.

### vid.165

We can use validator applied on the formGroup to check whether password and confirmPassword fields match. As we know classes are like blueprints for objs. Whenever we want to invoke a method or access a prop we need to create an instance out of the class. On the other hand if we use the static keyw before the prop/method in the class we can directly access to the method or prop without creating a new instace. They're beneficial for creating utility methods. If we don't need to maintain object's state, converting a method into a static method will result in writing less code. It's useful for grouping multiple validators. There are some limitations with the static methods. They don't have access to obj's props or methods. Using the this keyw is prohibited under the static method.

### vid.166

Validators must return either an object containing errors or null. Angular exports a type for a method's return val called ValidationErrors. Remember that returning an object in this case will be interpreted as an error, so we can add info about the error through that obj. To indicate that there are no errors, return null. Next accept the form group. For that import AbstractControl and annotate the arg that you pass to static method with it. The FormGroup accepts the 2nd arg, the validators we want to apply to the whole group.
So basically validator functions are reg. functions that accept a FormGroup/Control. We can access to their values to perform validation

### vid.167

Factory functions are a design pattern for return an new obj/funct. Mainly used for creating objs, but can be used to create functions as well. The purpose of writing it is to return a function tailored to our needs. If we want to be able to customize the controls used by our validator, we can rewrite it as a factory function. Angular exports an interface for factory functs that return a validator, called ValidatorFn

### vid.168

The form won't be aware of that two password fields don't match. We need to inform the control of the error from the FormGroup. Angular makes it easy to be able to add errors to controls. Angular manages errors on our behalf. It will update the errors prop on group of control based on the val returned by the validator function. In some cases we may need to manually add an error. Every control and group has a function called setErrors for manually adding errors. It receives one arg, an error that should be added to the control. Note that angular won't remove an error if we manually add it. We should remember to remove the error once the field is valid

### vid.169

Angular supports the async validators out of the box. The biggest differ. between sync and async validators is how they handle the dependency injection. Our primary way of commun. with firebase is with a service, so we need to inject a service into the validator. If we were using the static method we wouldn't be able to access an injected service. We should keep our sync and async validators in separate files. by def classes can't be injected with the services. We need to tell the Angular that class can be injected with the services. Note that in components case angular was adding the dependency injection support for a component auto on our behalf. If we create a plain JS class we need to manually inform Angular that we need a dependency injection. We can do that by decorating the class with an @Injectable decorator. By adding this decorator, we'll be able to inject services into the constructor function. Angular has an interface called AsyncValidator for classes that are async validators. While implementing this interface we must define a method called validate

### vid.170

The validate funct will have one param called control, which is the reference to the control that the validator has been applied to. The most important info here is the return val. We have an option of returning an observable or promise. In either case a ValidationErrors obj or null value must be returned. Angular will auto subscribe to an observable if we return one, and in case of promise it will wait for a resolved value. There isn't an official method in Firebase to check whether an email is unique. Firebase recommends using fetchSignInMethodsForEmail as an alternative

### vid.171

The injectable decorator has 2 benefits. It'll enable Angular to inject services into our class and we would be able to inject the given class to other classes. Dependency injection can go both ways. FormControl function has a 3rd arg for async validators. By def Angular doesn't assume our class can be injected into our app. We must explicitly tell angular our class can be injected into other areas of our app. The simplest way to make our class injectable is by passing an object to the Injectable decorator function. Set providedIn: "root";
Angular doesn't fire the async validators until every sync validation has been satisfied. Async validators require resources from a server. It's not considered a good practice to initiate a req on every change made to the control. Angular helps us from using fewer resources by waiting for the sync validations to be satisfied
