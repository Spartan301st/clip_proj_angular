# Clips

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Description of the Section 8:

In this section we where working on the form & form validation for the login process. We used the template forms and html5 validations overtaken by angular for handling the input fields validation, and inform user ASAP about the mistakes he/she made while logging in.

## Topics covered in Section 8:

- Template driven forms
- Functionality of FormsModule
- Two-way binding with [(ngModel)]
- Template variables using #
- Accessing element props with template var
- Form input field validation with html5 attributes overtaken by Angular validation under the hood

## Notes for the entire Section 8:

vid.110
template driven forms are directly configured in the template, and not separately in the class as Reactive forms.
If we want to sue the template forms we need to register a module. It's similar to enabling the reactive forms in an angular proj.
For template forms import FormsModule from @angular/forms and add it to import option

vid.111
Behind the scenes the FormsModule has registered the form element in our login template. The form element is being controlled by the directive called NgForm, which creates a top level FormGroup instance and binds it to a form to track form value and validation status. It's exported from the FormsModule. NgForm will apply form:not([ngNoForm]):not([formGroup]) directive to form elements. Note that angular checks our templates before applying the directive. If we check our form from angular dev tools, we'll see that NgForm directive is applied to it auto. Every form element will be bound to the unique instance of the FormGroup class. That's what makes working with template forms so easy

vid.112
We can add a directive to our elements to help angular to identify the controls in our form. We don't need to create the instances in our class, because template forms are configured in templates instead of component class files.
Before adding the ngModel directive we should assing a name to our input. The name is used as an id for the control, and helps angular to identify the control. Now simply pass ngModel directive to the input as an attribute.
Two-way binding, is for being able to listen to events and updating a property simultaneously. It's a convenient way for updating values from an input. It's syntax is optional. We can handle inputs with prop and event bindings, using <input [value]="" (change)="" />. This syntax is always available. Angular provides a short way for accomplishig the same thing with two way binding, which combines two syntaxes together. The [(ngModel)] directive can perform 2 tasks. it can set the value attribute for an element with prop binding at the same time emmiting an event whenever the value changes in the doc.
[(ngModel)] === <input [value]="" (change)="" />
Note that nested inside the login componnet is the form element with an ngForm containing controls that holds the input fields that we added [(ngModel)] to.

vid.113
Under the hood templ forms use FormGroups and controls. One of the main challenges for working with the template forms is accessing the props from group and controls. One method for accessing the props created in the group is by using the template variables. Templates can create variables. Angular makes it possible to define vars from within the template file. Adding # character allows us to declare a varibale in our template. After typing it we need to provide a name for our varibale
// EX.

<form #loginForm>
We don't need to provide a val for this var. Angular will assing the element to this var. As a result we can access the form elements props in our template. There are some limitations to our template vars. They're only accessable in the template. We can't use them in our components, nor we can use the in other components. We can reference our variable through its name after the # character, and treat it like a prop. autocomplete is a native prop that is available in form elements, which tells whether autocomplete is enabled in our form.
// EX.
<div>{{ loginForm.autocomplete }}</div>
Next to the form element defined in angular dev tools is a list of classes and directives attached to it, highlighted in orange. Click on that element to view all the props related to it. The NgControlStatusGroup class has its own set of props, separate from NgFrom props. NgForm directive stores the props related to the group and controls. We need to tell the Angular to give us access to these directive props. For that we need to assing form template variable to a val called ngForm. By def if we don't assign val to the template var. angular will assume that the value should be the element. However if we want to access a class or directive, we can explicitly set the var. Here we're telling the angular to set the template var to ngForm directive.
By using template vars we can access an element's props. For accessing the directives or classes attached to an element, we can do so by explicitly stating it

vid.114
Adidng validation into a template form is done though html5 attributes. When we use template forms angular will hook into constraint validation to validate the form internally. We can add html5 attributes to the input element, and the angular would be able to pick up on them and override the default behavior. The form group will be able to store the current status of the form and we can continue to check them for the validity of the form

vid.115
instead of creating a separate component for errors, we'll keep everything inside the login component. The first step for handling errors is to access the control's errors. we can do so through the login form template variable. The better way is to add the template var to the input elements. We can access the controls directly through the template vars.
// EX.
<input #email="ngModel" />
Here ngModel directive is responsible for creating an instance of the formControl obj, so if we want to access the form control we must set our var to this directive. We aren't goint to render many error messages as we did during the registration form validation. Before we render the message, we should check whether the control has been touched, and angular will run the validation immediately.
// EX.

```
<p
  *ngIf="email.errors && email.touched && email.dirty"
  class="text-red-400"
>
  Email is invalid
</p>
```

vid.116
Apply same techniques on the password field that we've applied to the email input field. ngModel directive is responsible for creating the form control object, so we access status props through #password template var.

vid.117
Steps to prevent invalid login form:

- diable button
- add corresponding tailwind styles
- listen for submit event on the form
  // EX.
  [disabled]="loginForm.invalid"
