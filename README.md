# Clips

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Description of the Section 6:
In this section we where warking on the modal. We created tabs container with login and register tabs and added functionality for rendering them. We also touched the visual side of the entire web app.

## Topics covered in Section 6:
- Adding to & using tailwind in Angular project
- Input + Output decorators
- Loading static assets like google fonts
- Creating basic modules
- Creating components under the modules other than app
- single-use & reusable components
- shared modules, for generic features
- multislot content projection for projecting particular elements
- services for accessing data from different modules/components
- dependency injection in Angular, using @Injetable(), modules, components
- using [ngClass] + preventing default behavior of the element like a, btn with $event.preventDefault()
- Singleton
- ngOnInit() lifecycle function
- prop binding
- handling memo leak problem, using ngOnDestroy() function and .unregister() method
- ElementRef to access host element
- ngAfterContentInit()
- QueryList
- [class] syntax alternative to [ngClass]

## Notes for the entire Section 6:
### vid.57
larger projects typically have routing.
The noticable change would be a file called app-routing-module.ts
When we want to make template dynamic we need to store the template in the component (app), and not in the index of the src dir. 
Otherwise we won't be able to use types, directives, etc.

### Vid.58
TailwindCSS + PurgeCSS

### vid.59
use npm install -D tailwindcss to install tailwind as a dev dependency
run npx tailwind init to be able to use tailwind. npx is a command to instruct node js to run the executable inside the node_modules. After running this command a new tailwind.config file would be created. Tailwind will manipulate css through js
Finally add:
@tailwind base;
@tailwind components;
@tailwind utilities;
to styles.css in the source dir
@tailwind is an indicator that we're using the tailwind directive for processing css
Note that tailwind doesn't use PurgeCSS by def anymore
See https://tailwindcss.com/docs/upgrade-guide#configure-content-sources

### vid.60
tailwind.config file descriptions:
-content - for indicating tailwind files
-theme - contains the options for modifying the colors, font-sizes, etc.
-variants - for configuring the conditions to use the different classes
-plugins - array of plugins for extending the tailwind
If we leave these empty tailwind will apply the default configs
We need to add custom css classes to make our app complete. Sometimes it's easier to add css styles directly to styles.css file instead of tailwind's config file

### vid.61
with tailwind we don't use pure css too much. Just pass tailwind class to the element you want to modify. There are 3 font families provided by the tailwind. You can configure custom font if you can't see it under the available ones

### vid.62
to add google fonts, simply copy the link it provides and add it to index.html in the src folder
angular searches for static files in the assets folder by def
Note that background video may freeze. Videos won't be autoplayed, unless users interact with it, so browsers expect some interaction from the user's side before playing the video

### vid.63
modal = pop-up
always use divide and conquer strategy when developing your apps

### vid.64
we can create a module manually or by using cli. Go with the cli for proper configuration
use "ng generate module <moduleName>" to create a new module
app module is the root module. the module system in angular enables us to export and import group of files. We can visualize modules as a hierarchy
When we generate components, they're auto registered inside the app module. Modules generated with the modules aren't auto registered, we need to import the module into the app module. Once we generate a module with the cli a dedicated dir is created for it. Inside that dir we have a <moduleName>.module.ts file. It's a class decorated with an NgModule function to which an obj is passed for configuration. A CommonModule is imported and passed, which exports components, directives and pipes. Note that a BrowserModule also performs the similar task to CommonModule. Both imports the same components, directives and pipes, but the BrowserModule will provide additional services for running an app on the browser. BrowserModule should only be imported into the root module, and any other module can import the common module. CommonModule is re-exported by the BrowserModule under the hood, so when we import BrowserModule in app module the CommonModule is imported by def as well.
To import the newly created module to our app module simply import it at the top of the file and add it to the list of imports

### vid.65
split our code into separate files for managability
as covered before to generate a new component run "ng generate component <compName>". Note that the component we generated will be declared inside the app.module. If the component would be used in different multiple places, it's better to declare it in app module. We can take code from the app template, split it to different components, check that component's selector value in <componentName>.component and use it as a tag in app template. Note that we can use that component as it was auto imported to app.module while its generation. As mentioned before components are registered under the app module. we can force the cli to declare components under the different module by declaring component under the modules directory using "ng generate component <moduleName/compName>". Note that in this case component will auto be added to the module under which it was declared. The last step would be to load that component under the app component, but if we try to load a component to an app module declared under another module an error would appear

### Vid.66
we must explicitly export variables, functions and objects from modules. remember that angulars modules system is similar to JS's except it's a bit robust. in the ngModule of the new module declare an exports option, which is an array of components and servises exported from the module. If the component is declared in another module, we must export it if we want to use it inside the components declared outside of the module, otherwise we get an error

### vid.67
single-use component - defined only once
reusable component - can be modified for different use cases
When desing a reusable component we should also consider its responsibilities, its inputs, and its outputs. In case of a modal component it should handle toggling the visibility of the modal. Other components shouldn't be responsible for this task. It should fall solely on the modal component. Managing the model is the responsibility of the modal component. Modal component should allow parent components to provide the content. We can add content projection sent from the parent to child component. Lastly the modal component should provide the location for rendering the content.

### vid.68
If we know that we are going to reuse out modal we should create it in a separate module. It's a common practice to create smth called a shared module. It's a module with a generic directives, class, pipes and components. Devs will outsource generic features to a shared module. This module can be imported into other modules, which in turn reduces the clutter in other modules. To create a new module use ng generate module <moduleName>. It's a common practice to use name shared for shared modules. the next step is to create a component for our model using ng generate component shared/<compName>. By def cli declares a component but doesn;t export it. Once again to export a component declared inside another module use 
exports: [
    ModalComponent
  ]
Now to be able to use that component defined in a separate shared module we should first import that shared module from another module an add it to imports section under the NgModule. By importing that shared module we are able to use that reusable modal

### vid.69
As we created a separate shared module with a reusable modal component we can declare the static parts for inside that component. Then as we have imported that shared module to a separate module, we can define a new component for the later one, cover all the modifications for the modal with the modal selector in the shared module to pass the modified data to it between custom tags. Finally we can use ng-content to rendered that passed data in the specified place within that shred module's modal component

### vid.70
multislot content projection. We aren't restricted to only one ng-content elements. Multiple slots can be added to our component. Add select prop to that component, Which tells angular which elements to project into the slot. The value must be a css string. It's common to select an attribute placed within [] (a css way of selecting attributes). After selection head to another component that you are inserting to the given component, and add the same attribute name, without [], to the element to place it within the indicated place in another 
component

### vid.71
When we eneed to access data in multiple components, services are the solution. However they aren't always necessary. If we have data for one component, defining the data inside the component class is perfectly acceptable. Services become useful once the data is required in multiple components. Services shouldn't be confused with State management. You don't always need to use State management libraries (Redux)

### vid.72
typically it's recommended to define components, directives and pipes inside the shared module. We can define services in other modules, but if the service is available globally we should declare them in the app module. To generate the service run ng generate service services/<serviceName>. Here we organize our global services under a single directory services. After generation 2 files would be created one for specs, and one for service that we need

### vid.73
Services are the objs that can be made available to any component of our app. In most cases devs store data in global service.
To be able to use the data defined in the global service we use the dependency injection. It's a programming practice for creating objects.
It has 2 jobs. 1st, creating an object out of our classes. 2nd, pass on these objs to our components or classes that need them.
Angular supports dependency injection, so we don't need to create objs ourselves. They'll be created for us auto.
First we have to import the service to our component and add a public param to constructor() with annotated type of that service. During the compilation process from typeScript to JS, code not only gets compiled with the help of typeScript compiler but with Angular compiler as well. During this process it looks at constructor funtions of our classes. Angular uses the argument list to scan for dependencies. The most important part are the type annotations of our arguments, which give an insite on type of the dependencies our class needs. Based on this annotation angular will supply us with a correct instance for our arguments.
Dependency injection keeps our code clean. instead of creating a service, we can ask for it. Our components never have to worry about creating classes. They can be supplied with everything they need

### vid.74
By def angular doesn't make our classes injectable. We must tell which of the classes can be injected. There are 3 ways to do that.
1)@Injetable() decorator is imported an initialized auto when we create a service. When adding it to a class, Injetable tells angular that the class can be injected into a component. It has one argument, and object for configuration. providedIn option tells angular where to expose the service. By setting it to root service will be injectible from the root injector, available for each component.
About the others way of making class injectable. All of them still need @Injetable() decorator.
2) Using modules. Remove providedIn option from the decorator. In the shared module import the necessary service, and define providers option of an array in ngModule decorator, which is an array of services. We must declare our service inside this option.
By registering a service logged with the module it will be available to components, directives and pipes declared in the same module. Everywhere else, we won't have access to that service. 
3) Using components. 1st import the service you want to use. Then as it was the case with the modules, use providers option inside the @Component decorator with [<serviceName>] as a value.
So you can inject services on a global, module, and component level

### vid.75
We can use data defined within the modal to conditionally render the template elements 
//EX.
[ngClass]="{hidden: !modal.isModalOpen()}"
here we set hidden class to true or false based on the value we retrieve from the modal service using getter. Now we can inject the same service to another component, by 1st importing it and then adding an arg annotated with that service name. Then add some event listener to that component's template to be able to affect that service
// EX.
(click)="openModal($event)"
so above we are calling a method openModal() with an $event. Finally we can define that method iside the component
// EX.
openModal($event: Event) {
    $event.preventDefault()
    this.modal.toggleModal()
}
here we prevent the default behavior and call the toggleModal method

So we defined a set of methods for interacting with the visible prop. We can call this methods to affect the appearence of an element within the template of a component

### vid.76
Note that we don't need to use $event.preventDefault with div components as they don't redirect users to other page

### vid.77
everytime we inject a new service it will be the same instance. It doesn't matter how many times an object gets injected. This works great but does provide a problem. For example if we declare two modals, they'll use the same instance of the service, which in turn will affect them both appear at the same time
Singleton is programming concept where one instance of a class exists in an application. By def angular treats services as singletons. If our app needs an instance of a service angular will check if one exists already. It will return an instence, otherwise it'll create a new instance. Therefore our components will use the same service. Services - single source of truth. To solve the abovementioned problem we can either force angular to create 2 separate instances of the given service object, but it won't be necessary in our case

### vid.78
The 2nd way to handle the problem of same instance mentioned above is to pass an id for each modal. We are going to register modals from the parent component, as they are the ones creating the modals. Inject the service in the component, and add an arg to a constructor with that service annotation. After injecting the service we'll register a new modal. It should be registered during the initialization of the component. Use ngOnInit lifecycle function to help us, where we'll define a function for registering an id of the modal by passing an id to it. Next inside the service we are going to create an array for storing the id of modals. Next we can define an interface that defines the types of id and visible props

### vid.79
refactoring methods for handling visibility of the component

### vid.80
We should use inputs to send down data to the modal component. By accepting input data, the modal component will know which modal to open or close. Using inputs & outputs is a viable option for a parent child component relationship.
Normally we would apply prop binding to props on a component. If we ommit the [] from our prop the val for the prop will be interpreted as a string

### vid.81
A memory leak is when a var isn't initialized. A memo leak can occure if we forget to destroy unused var, and give back the memo it occupies. In JS managing memo is semi-automated. Vars defined in fucntions are cleaned up. Props in classes are destroyed once classes are destroyed. Garbage Collection. We can manually free unused variable's memo by assigning null to it. We don't have to worry very often about memo managing, as JS will handle most of the task. When we add a component, Angular creates an instance of it. The problem we are issuing are modals with duplicate ids, that don't get released from the memo. We should unregister a model if it's destroyed

### vid.82
It makes sense to unregister the modal when the component gets destroyed. We can use lifecycle hooks to detect when the component is destroyed. Before the component gets destroyed we'll call a function for unregistering the modal. 1st we need to implement an interface	for type safety by importing and adding onDestroy, after onInit of the given component class. Then declare ngOnDestroy function in the components class and use .unregister() to remove the modal from the memo.
// EX.
ngOnDestroy(): void {
    this.modal.unregister("auth")
}
If you create a data insidde a component the data will take up a memo until the component is destroyed, hovewer if we have a service, data in a service will persist

### vid.83
as we already know child elems inherit css props from their parents by def. One soluting in case if you want to prevent it is by inserting our modal components in the root location of our app template, but it isn't an ideal solution. We can solve it by removing our modal. React calls this feature portals, Vue teleportation. In Angular there isn't such a feature for handling this task, but we can easily implement this feature. In the modal component import ElementRef. It's an object that gives us access to the host element of our component. if we inspect the angular app we can see that a template gets inserted inside the component tags. The component tag is considered as a host element. By injecting the elementRef object we'll be given an access to the respective element's host element. Our main objective is to transfer our element from its current location to the docs root which is the body tag. Before we can move an element we have to grab it. Inside the constructor of our modal component class inject the ElementRef object by annotating a new public arg with it. Don't forget to restart your server! You can think of ElementRef class as a wrapper around the native dom element. Now we can move the host element. Now inside the ngOnInit call document.body.appendChild(this.el.nativeElementProperty). Note that we'll move the element after ngOnInit function is called, and hook has been initialized. It's the soonest we can move an element

### vid.84
A tab UI has 2 features:
1. Nav menu for switching between content.
2. Content itself. Only one tab may remain active.
Tabs come in groups. We want our tab component to be reusable. We should be able to display as many tabs as we want. We don't want different groups of tabs affect one another. We can separate tabs by creating a container component. The container will manage to switch between tabs. Tabs defined outside the container won't be affected. 2nd component we'll create will be the content for a tab. Overall we need 2 components. a container for a group of tabs, and another component for a individual tab. Accordions are similar ui elements to tabs.
To create a component for container type ng g c shared/<tabContainerName> and for tab type ng g c shared/<tabName> . typing g c is the same as typing generate component. After creating both components we need to export them. We don't have to declare components with the shared module. The cli will auto declare both components. We are declaring them in a shared module to be reusable, however we need to export them.
Inside the shared.module, within the exports option add these components, that are already imported and ready to be exported
With content projection syntax (ng-content) we aren't only limited projecting only the regular html elements. Components might be projeted into another components

### vid.85
As mentioned before the projected content will replace the ng-content element in our template. We need to grab the projected content. The content-children decorator allows us to select elements from projected content
ngOnInit() function gets called when the component has been initialized. We'll have acces to props and methods within a class, however we don't have access to the projected content data. During this lifecycle function, the projected content hasn't been initialized yet.
Angular offers another hook called ngAfterContentInit(), which runs after the projected content has been initialized. Instead of onInit import AfterContentInit, change the class' implements declaration to it, and finally replace ngOnInit to ngAfterContentInit. It returns an objet called QueryList, with the necessary props about the projected content.

### vid.86
The reason we don't get code completion is because of the return value of a decorator. It's of type any by def. 1st import QueryList from angular/core. Then annotate your ContentChildren prop to QueryList and define its type with type generics, <...>. Finally set the value of that ContentChildren to an instance of QueryList.
Note that props can be made optional by adding a question mark symbol before annotating the type and removing the initial val. You don't have to do that, but this approach adds type safety.

### vid.87
To make tabs dynamic, start with title. In modals template file pass an attribute for each tab title, and in tab component add @Input decorator for tabTitle. Now inside the tabs-container template replace static title text with an expression passed from the tab component class. Note that prop def in tab component class should be public

### vid.88
We should make only 1 tab active, by adding active property. Create a new prop in tab class with input decorator to be able to receive data from the tabs container. We can refer to 1st tab with .first prop which is defined in QueryList class. In ngAfterContentInit we can use filter to find the active tab by checking its active prop. IF filter returns an empty array then no tab was selected so use a function to select the first tab by def using abovementiond .first prop of this.tabs. before setting active property of the selected tab to true, we 1st have to set the rest to false, otherwise we might get multiple active tabs. Finally in the tabs container template where we loop through tabs add a (click) to tab link to emmit a click event and call the function for selection

### vid.89
We have to make a visual changes to tabs to distinguish between active and inactive tabs. The best way is to call the ngClass directive by passing an object to it and passing "some tailwind styles": !tab.active to add. Tailwind has a class for hinding the elements, hidden.
We an use an alternative syntax in angular to ngClass for adding classes, [class]. We can pass .<className> after the class to indicate that we are trying to bind them, [class.hidden]. The value must be an expression that eval to a boolean:
// EX.
[class.hidden] = "!active"

### vid.90
the simplest way of preventing the default behavior of a link/button is the function that is called during the event to return a false. Alternative to preventDefault().

