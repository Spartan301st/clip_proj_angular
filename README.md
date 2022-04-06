# Clips

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Description of the Section 7:
In this section we where warking on the form & form validation. We created the logic for handling the input fields validation, and inform user in ASAP about the mistakes he/she made while filling the form.

## Topics covered in Section 7:
- Reactive forms with ReactiveFormsModule
- FormGroup as a container for forms
- FormControl for controlling each input field in a form
- [formGroup] for binding the form to the group in class
- Built in Angular validators, like required, email, min, max, pattern (for regEx), 
- Accessing controller errors, using both .controls prop and .get() method and conditionally rendering them
- Essential props of AbstractControl
- Presentational Components
- ng-container for grouping elements
- Input masking phone input field using ngx-mask library
- (ngSubmit) event

## Notes for the entire Section 7:
### vid.91
We need to implement form validation, feedback for the users, dynamic fields(optional). 
In angular we have two different ways of handling the forms. You can choose either one depending on your app needs
Reactive forms - harder to learn, but are more flexible/scalable and configured through classes
Template forms - easier to learn, but are less flexible/scalable and configured through templates
Separate the login and registration parts to the corresponding components within the same user module and then use them in auth-modal by adding their selector tag

### vid.92
1st step regardless of what type form we are building is to register the reactive forms module. Import ReactiveFormsModule module from angular/forms in the parent module of the form, in our case user module. Don't forget to add it to imports option as well. Reactive modules are configured in component's class file. In that file first import FormGroup object, which allows us to register a form. Think of it as a container for our form. We might have multiple forms in our page, so we need to isolate them from one another. FormGroup obj allows us to create a container for each form. Create an instance of FormGroup and pass an obj of options to it. Now if you check the angular dev tools, you'll see that, component contains a registerForm object, with all the necessary props and methods

### vid.93
A form control is an object that controls an individual input field. For every input field in our form we should have a corresponding form control. 1st import FormControl obj from the angular/forms in the same component. We need to register our inputs by creating new instance of FormControl obj. These new instances must be added inside the obj passed into the form group inside the instance of the FormGroup options obj create a prop and pass a val of new FormControl instance
For every input in our form we should add a new instance to the group
// EX.
```
export class RegisterComponent {
registerForm = new FormGroup({
  name: new FormControl(""),
  email: new FormControl(""),
  age: new FormControl(""),
  password: new FormControl(""),
  confirm_password: new FormControl(""),
  phoneNumber: new FormControl(""), 
})
```
You can confirm that this fields were added to the component by checking registerForm obj's controls prop.

### vid.94
Angular won't auto connect group in our class to the form in the template. They're completely disconnected from one another. We need to establish a relationship between a group in our class and the form elem in our template. We can connect the two by binding the two.
On the form we first have to bind the directive [formGroup], which will help us bind the form to the group in the class. The value for this directive must be the formGroup obj.
// EX.
<form [formGroup]="registerForm">
After this we'll be able to control form throught the group in our class. Now we need to bind input fields to their corresponding controllers. Pass formControlName="<nameOfTheController>" to the input field. We aren't providing the name of the form group, as angular will search through our template to find an ancestor element with formGroup directive. If found, angular will search for the controller bound to this group. Therefore we don't need to provide full path to the controller. Once registered angular will track the changes within that input field. Check the value prop to see the vals stored in different fields. 

### vid.95
Validation as we know is the process of checking if the input passed is in correct format for the corresponding input field. Angular comes with the validators out of the box. Validators are functions that will check the value against some rules. A bool value is returned as a result of the validation. 1st import Validators package from angular/forms. We can apply validators to controllers. when creating an instance of a controller, in the FormControl() pass a 2nd arg, which is an array of validatorfunctions to run the value through.
// EX.
name: new FormControl("", [
    Validators.required,
    Validators.minLength(3)
]) 
Angular will auto enforce our rules when the component gets loaded. Note that until we satisfy the rules defined within the validators the status for our registerForm obj remains INVALID. Note that status shows the validity of the entire form. To see the validity of a particular field, check the status for a particular controller in controls. Note that we can add html attributes for validating the inputs, and the angular will override the behavior of the browser's validation mechanism. So we can simply use the html attribute for validation, and if it is supported by the angular, angular will overtake this functionality

### vid.96
errors can be accessed from their respective controllers. Angular gives us 2 ways to access controller's errors
1. We can access errors using controls prop.
// EX.
<p>{{registerForm.controls.name?.errors}}</p>
2. Using get() function that accepts the name of the controller
// EX.
<p>{{registerForm.get("name")?.errors}}</p>
Both function the same way. Option with get() is for more robust apps. 
Errors are stored under the errors prop, that stores an obj so to output the entire error obj we can use json pipe. The null value for the error indicates that input is valid. Always check the structure of the error object before trying a new rule.

### vid.97
For outputting an error message we can use ngIf directive to check the condition whether there was an error.
// EX.
- for required field
<p *ngIf="registerForm.controls['name']errors['required']" class="text-red-400">
- for minimum length of the input in the field
<p *ngIf="registerForm.controls['name']errors['minlength']" class="text-red-400">

### vid.98
In some cases you might not find the info you were looking for in a specific class' doc. You might check if that class inherits another class. For ex FormControl, FormGroup, and FormArray classes are subclasses of AbstractControl class.
Some essential props of AbstractControl are:
- valid - if the input is valid
- invalid - if the input is invalid
- disabled - ignore the validation
- touhed - field has been touched
- untouhed - field remains intact
- pristine - initial value in the field remains unchanged
- dirty - value in the field has been changed
We can use them to indicate when the error message should be rendered
// EX.
<p *ngIf="registerForm.controls['name'].touched && registerForm.controls['name'].dirty && registerForm.controls['name'].errors?.['required']" class="text-red-400">
Note that this clutters our template file

### vid.99
We're going to perform validation on every input. Aside from updating the inputs in our template, we'll be reusing some of the validators. The best way to prevent that is to create a component, which handles the error messages for the inputs. The only business logic it'll contain is accept input from the parent component. This type of components are called Presentational Components. Our tab component is that kind of component. As forms are very commonly used accross the app, we can create a Presentational Component inside the shared module. We can now move repeatedly used elements to that component's template file. But as we move those fields we'll receive some errors as the relationship between input and its respective form control has been severed. We can fix these errors by passing on the control to the component as an input data. We should add the component to the exports option of the shared module. then pass the selector tag of the input component to the location in another component template file in app module for it to be rendered.

### vid.100
The input component needs a formControl for checking errors. The template doesn't have access to the group anymore, as it's been moved to a different component. But it's perfectly valid to pass down the controller through inputs. Inside the input component class we should declare an instance of FormControl with @Input decorator, otherwise TS will complain.
// EX.
@Input() control: FormControl = new FormControl()
Now we should pass control to this component. use [<FormControlInstance>] directive inside the input component selector tag, placed inside the parent component template file, and pass a control prop to it as a val.
// EX.
<app-input [control]="registerForm.controls['name']"></app-input>
But this causes an error as control here is recognized as a type of AbstractControl instead of FormControl. This has to do with FormGroup class. It's changing the type after creating a new instance of the formgroup class. Check the custom declaration file, with .d.ts extension by ctrl + left-cliking of the FormGroup. Note that here each prop in the object will be annotated with the AbstractControl class. The Angular doc states that FormControl class is a subclass of the AbstractControl class, and therefore typescript allows angular to perform this kin of change. There are various solutions we can implement to help the compiler to understand that we are sending an instance of the 
FormControl class. We can assert the type, update the type in the input component or move the props around. The easiest way is to move the props around. Inside the object passed to the FormGroup cut everything inside and make them instances of class itself (RegisterComponent), change : to = and remove the commas. Lastly, add controls back inside the FormGroup class using this keyw. We don't need to directly create the controls inside the obj we pass into the FormGroup class. They can be created ouside and then passed in. By separating them, we can pass our form controls directly to the input component, instead of through the RegisterForm group. Now we can deirectly pass control name as a value to the [control] directive, instead of using some bindings
// EX.
<app-input [control]="name"></app-input>

### vid.101
The validator should come from the parent component.
The formControlName directive will tell angular to search for the control inside a group. The problem is input component doesn't have access to the group. However we have access to the control. Instead of telling angular to find the fromControl we can directly bind the control to the input. For that use [formControl]="control". formControl name directive will tell angular to search for control in the form group, whereas formControl directive will allow us to directly bind the form control object to the input element
// EX.
```
<input [formControl]="control" type="text"
```
Note that we'll get an error when using this syntax. Angular doesn't recognize [formControl] directive, as it's a part of ReactiveForms module, to which we don't have the access, because the input component is declared under the shared module. So to fix the issue we can import ReactiveForms module. In the shared modules import ReactiveFormsModule and add it to imports option. Now replace every registerForm.controls['name'] with control, as we don't have access to registerForm anymore in the input template file.
Instead of writing the same condition, we should wrap our error messages with an element. However, we don't want to change the structure of our doc. Creating a nested html structure can clutter the doc. Luckily, we can create an invisible elem, by wrapping the error paragraph elements with ng-container, the purpose of which is to group elements. it's very similar to ng-template element, except that ng-container is always rendered, whereas ng-template must be rendered conditionally. It's optional to add structural directive to ng-container

### vid.102
For our input fields to be reusable, we should provide their type and placeholder to input template dynamically from its component class. By def we'll assume that type is of type text.
// EX.
@Input() type = "text"
@Input() placeholder = ""
Then use directives to bind the attributes to corresponding values
// EX.
[type]="type" and [placeholder]="placeholder"
Now we have to replace the type and placeholders for each input field passing them in app-input
// EX.
<app-input [control]="email" type="email" placeholder="Enter Email"></app-input>
The last step would be to validate the email in the register component class, using email validator, which in turn returns an object with a prop called email. It's value will be true if the validation fails.
// EX.
email= new FormControl("", [
    Validators.required,
    Validators.email
  ])

### vid.103
For age field we use the type of number. The error for the min validator would be an obj with the prop called min which has 2 props: min & actual. The error for the max is the same as for min except that it has a prop max with max & actual objs props.

### vid.104
RegEx is the best way to check if the password is strong enough. out of the box Angular ships a validator for running an input's value agains a regEx. We can use pattern() validator to check the input value against some regEx pattern. Auto replaces inplementation of html pattern attribute.
// EX.
Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)

### vid.105
Input masking for the phone number field. By def, browsers don't format the values. If we want to force the fromatting we could implement smth called input masking. It's a technique for constraining the user input. We can use a lib called ngx-mask for that purpose. It exports a module for importing its features into our app. It's common to import the module to expose a library's features. We should import it to a module wherever we have the component with some form input fields, and then add it to import option. It's recommended to call forRoot() function here.
// EX.
NgxMaskModule.forRoot()
Modules can be tricky at times. They can be shipped with directives, services, and components. It's possible that service may be duplicated. To prevent the duplication, some modules will define the forRoot() function, to prevent the app from duplicating a service.
then in the input component class we have to define a prop with an Input decorator. By passing it an empty string a a val, we make ngx masking optional. After registering the ngx mask module we can add the mask directive to enable input masking on an element. As long as string value is empty input masking won't be applid to inputs that don't need them

### vid.106
with the ngx library we'll be using a combination of spec chars and constraints to help the user input their phone number. On the input field we can add fromat prop. This is the prop where we can add a masking to our input.
// EX.
<app-input [control]="phoneNumber" placeholder="Enter Phone Number" format="(000)00-00-00"></app-input>
the ngx mask package doesn't validate the input. This step should be handled by us. Note that by def ngx mask library removes spec chars from the inputs value. To keep them we need to add an option to that input field. Add the following to disable the ability of ngx to remove spec chars:
// EX.
[dropSpecialCharacters]="false"

### vid.107
If we have one invalid field in FormGroup, then the valid prop of the entire form is set to invalid. We can use this in our advantage by disabling form submittion until valid prop has true value. On the submittion button element bind the diabled attribute to the registerForm.invalid
// EX.
<button type="submit"
      class="block w-full bg-indigo-400 text-white py-1.5 px-3 rounded transition
        hover:bg-indigo-500" [disabled]="registerForm.invalid">
      Submit
</button>
The invalid prop will store a bool value based on the validity of the form; set to true if the form is invalid. The disabled classes can override hover classes if they affect the same prop. Note that diabled classes aren't turned on by def in tailwind. We need to flip the switch on this classes from tailwind.config.js file. The variant classes can be configured through the variant object in tailwind, so add them to the extend object. Inside this object we can add a list of css props we want to add classes for, with a val of an array of variants that should be added for this prop. Not necessary in Tailwind 3.x

### vid.108
Angular custom introduces events for listening to submittion event.
Both (submit) and (ngSubmit) are triggered on the form submittion. Submit is the default browser submittion event. NgSubmit is the custom event by angular. The difference is that ngSubmit will auto stop the browser from refreshing when the form is submitted. This step should be preformed manually if we use (sumbit) event. So better use (ngSubmit)

### vid.109
Angular is able to perform the actions behind the scenes. Unlike traditional apps, page doesn't refresh when the user interacts with our app. We can inform the user when a particular behind the scene event happens. For example during the processing of the from submition. The get keyw will treat the function as a getter