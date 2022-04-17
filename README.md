# Clips

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Description of the Section 12:

In this section we were working with the routers. We've configured routes for the specific paths and rendered correspondig pages. We've also created separate routing modules, binded some specific data for routes, subscribed to route changes, added dynamic route params for each video uploaded, used query parameters. We also ensured that users will be redirected once they encounter 404 page not found as well as use old routes plus added some route guards to prevent unauthorized page view.

## Topics covered in Section 12:

- Intro to angular Router, history API and @angular/router
- Configuring route
- router-outlet directive
- routerLink directive
- routerLinkActive directive, handling partial url match problem and binding an object of options to the link
- using --routing flag to generate additional routing module
- forRoot vs forChild functions
- navigateByUrl() for redirects
- adding/binding data to a route with data property
- subscribing to the events prop of router to listen for changes that router experiences. NavigationEnd event
- dynamic segments/route params (:routeParamName) and how to retrieve tham with .snapshot.params
- Query params
- navigateByUrl vs navigate and [queryParams] prop
- wildcard path for 404 pages
- redirecting users from old page url to a new one
- route guards by angular/fire package
- using redirectUnauthorizedToHome to redirect an unauthorized user

## Notes for the entire Section 12:

### vid.172

The concept of serving different resources based on the URL is called routing. Routing is handled on the backend. History api is a standartized api in most browsers. We can navigate to different URLs with JS. By doing so browser won't reload the assets. The history.pushState() will update the path in the URL. URLs consist of domain (name.extension) and path. The pushState() allows us to modify the path. This function has 3 args:
data - data for the new page
title - ignored by the browsers
url - path to navigate to
Note that the history api modifies the url, but it doesn't manage the doc. This task is left to us to handle. Angular ships a separate package for handling the routing called @angular/router. Angular can manage swapping components, updating the url, and monitoring the changes. Under the hood it uses the history api. It doesn't come preinstalled with the default angular package. We can either confirm its installation during the creation of our app or install it manually

### vid.173

Inside the index.html of our app we have the base tag. The value of href attribute is the base path of our app. By def base path is set to the root of our domain and it will change as we navigate through diffrent routes. Configuring the base path could be helpful if you want to isolate your app to a spec path. When we initially created our app we indicated to add routing functionality as well. Check out the app-routing module for the details. Routing must be config from within a module as it can get messy when the project grows. The convention is to name routing module by adding routing to the filename. At the top we're importing RouterModule from the @angular/router package. It will import services, components and directives for adding routing capabilities to an app. Below it we have an array of routes, which contains objects with the config settings for each route. A route refers to a path in our app. This array of routes is annotated with the Routes type, which is exported by the angular's router package. Lastly RouterModule is imported into the app router module. The Router won't become aware about our routes (array) unless we pass them in as an arg to the forRoot function. So by passing the routes array to forRoot function ofRouterModule we are registering all the routes defined within that array. Lastly the RouterModule is exported. We can export the config file by exporting the RouterModule. Note that inside the app module we are importing the AppRoutingModule, and adding it to the imports array. The router will handle the pages in our app. It doesn't handle adding the routes for static asset files. For static asset files we'll let server handle delivery of these files

### vid.174

For every route in our app we need to associate it with a component. Creating a component for the page isn't much different than creating a regular component. You should always consider which sections of your app should be global. Components for pages should focus on the main content of the page, and shouldn't worry about other page sections. Angular doesn't know which template it should render for the specific route, so we must inform it. For Configuring the routing head to app-routing module. Inside the routes array we can add objs with info about each route. 1st prop in the object that we pass to routes array would be path prop, to which we assign a string of relative URL path. As angular prefixes our paths with a base path it's redundant to add / at the beginning of our paths. Next add component prop that should receive a component object that we have created separately for this route. Import the corresponding component and assign it to component prop. Finally we need to indicate where that component should be inserted in the app component. For that we should use router-outlet directive, which acts as a placeholder for our components. Once the router has been initialized this directive will load the component for the corresponding path

### vid.175

Exercise for creating about page

### vid.176

One solution for adding links to an app is through anchor elements href attribute, but this will make page to refresh and the user must download again page resources on each navigation. The Routing module exports a directive for handling a navigation between pages that handles this problem. Swap the href attribute with the routerLink directive. Under the hood Angular is using a History api. We can go back and forth between pages.

### vid.177

routerLinkActive directive will apply a class to an element if the path is active. This will check if the routerLink directive is applied on the same element, if so the path passed to the routerLink will be compared with the path on the URL. A class is applied on the element if there is a match. The desired className can be assigned/passed to the routerLinkActive. In some cases we may need to apply classes to the parent element of the link the routerLinkActive directive can be applied to the parent elements of links. If the routerLinkActive direct. can't find the routerLink directive it'll search for this directive on the child element, so we can apply it directly on the anchor or parent element. Attaching dynamic elements is easy, but there is a common flow that we should be aware of. Active classes may get attached to elements that don't have exact match. By def. routerLinkActive directive will perform a partial match, meaning that if the link partially matches the path in the address bar Angular will consider it as a match. Every path contains a /, therefore Angular will consider every link that points to the home page to be active. We can override this behavior by binding an object of options to the link. Directives can have props decorated with the input decorator. This implies that we can pass additional vals to the directives. If we set the exact: true, Angular will enforce exact matching. For this we can use [routerLinkActiveOptions] property binding
// EX.
[routerLinkActiveOptions]="{ exact: true }"
Always be aware of this when matching the links

### vid.178

Along with generating a module we should generate a routing module. It's perfectly acceptable to have multiple routing modules under one app. Angular CLI has an option for generating modules with an additional routing module using --routing flag
// EX.
ng g module Video --routing
Two files should be generated after running this command. An ordinary module file and routing module file. In the routing module file we have the exact same configurations that we had in app-routing module. The biggest difference is how the module is imported. In this case routing module is imported with the forChild function, which is completely different from the forRoot function used in app-routing module. forRoot function will register a service called Router, a service for interacting with the router in our app. The forChild function on the other hand doesn't register this service. There is no point in registering the service if it's already registered. In most cases we should call the forRoot function only once. For other routes use the forChild function. Don't forget to register other modules inside the app.module by importing them and adding them to imports array. As we import the child module we don't need to import its routing module separately as it comes already imported within that module. Angular gives us the separation of concerns by allowing us to structure our routes in different modules.

### vid.179

In some cases we may need to redirect the user after our app has performed an action. We can force the redirection by injecting the router. The Router class can be injected in our app after we've impoter the Router module. We can interact with the router by calling the methods provided by this class. The method we're interested in is called navigateByUrl(), which is the simplest method that can be used for redirecting the user. It accepts 2 params: url to which the user should be redirected to and extras optional object of additional settings. It returns a promise that resolves to a boolean value. First import the Router class and inject it in the constructor function of the given component. The router can be configured to work with an absolute or relative paths. An absolute path will redirect the user to the new path relative to the base path of our app, whereas a relative path gets appended to the current route

### vid.180

It's common to refactor the code as you're building an app. Here we're refactoring the logout function by moving it to auth service. We outsource the logic and functionality into a service for convenience and reusability

### vid.181

Data can be associated with the route. The data we add to the route can be helpful for adding additional info about a route. In the object for settings that we add to routes array for each route we can add a prop called data and assing it an object with some static data to be added to the route. This data will be exposed to the other areas of our app by the router's services. For ex we can specify whether this route requires the auth, by adding the authOnly: true prop. The ActivatedRoute is a service we can inject into our components to gather the info about the route the user's currently on; not to be confused with the router service which provides the methods for interacting with the router. We can subscribe to its data prop, which stores an observable that pushes the data from the current route. We can subscribe to this observable to grab the data added to our route. The router doesn't make the data easily accessable to services or components defined outside the routerOutlet directive. Keep in mind that the routerOutlet directive will manage the components for a route. Components managed by this directive will be given the latest changes to a route. The story is different from outside the directive.

### vid.182

As mentioned before, router doesn't provide us with the data from the route, as our service is outside the router-outlet directive. Throughout the lifetime of our app, the Router emmits events whenever the user navigates around the app. Events can be emmited by the user's actions or when we force them to navigate. During these events we can access the info about the current route. We can solve our issue by listening to these events. We can subscribe to the events prop of router to listen for changes that router experiences. There are multiple events being emmited. The NavigationEnd event is emmited when the router has finished navigating to a route. After this event has been emmited, we can attemt to retrieve a data related to the current route. Import that event class. router.events observable will emmit several events. We aren't interested in handling every single event. Unfortunately angular doesn't provide a way to listen to a specific event. Since the events prop is an observable we can use operators (filter) to listen to a specific event.
// EX.
filter(e => e instanceof NavigationEnd)

### vid.183

As mentioned angular doesn't make it easy to retrieve data outside of the outlet. One trick to get the data is through angulars events. After filtering the event for NavigationEnd we can start grabbing the data. The activatedRoute service will store the info about the current route as mentioned earlier. From tis service we can grab the firstChild prop. Initially Router creates a tree of routes. It's possible to create routes from within a route. As a result we'll get a nested tree of routes. The activatedRoute service will return the entire tree of routes. We aren't interested in the entire list of routes. By accessing the firstChild we access the 1st child in the tree. We'll be returned another instance of an ActivatedRoute object. The tree mentioned before is a tree of ActivatedRoute objects. We can subscribe to the data observable in this object to gather the data about the route, in our case using switchMap flattening operator. Nullish coallesing oper. will check if the val on the left is null or undefined. If val isn't empty the operator will return the value otherwise it'll return the value on the right of the operator.
// EX.
map((e) => this.route.firstChild),
switchMap((route) => route?.data ?? of({}))

### vid.184

Creating a path to upload page, for uploading the videos

### vid.185

We need to assign unique routes for each video clip uploaded by the user. Instead of assigning route for each video, we can generate one route to handle all clips. Paths can have dynamic segments. Angular supports dynamic segments called route params, so we can render the video based on the URL. Action of managing and uploading videos would be a separate module. When we prefix the name of a segment with a :routeParamName Angular will interpret this as a route param, which is a placeholder for any val. We'll reference to the param by :routeParamName. To retrieve the route param value we can use ActivatedRoute. We can grab the info about the current route through the snapshot obj. Inside this obj params are stored inside params obj, where we can have multiple route params. We can reference to the param by its name.
// EX.

```
constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }
```

### vid.186

Whenever we navigate to a different pages Angular will destroy the component of the previous route. Angular will notice when we're directing ourselves to the same page. It won't destroy a component if it's the same component. This behavior works great for the user, but on the other hand we need to grab the route param. Angular provides two ways to grab info related to a route. We can grab info from the snapshot obj. Snapshots repres the route in a moment in time, and doesn't get updated after we inject the service. It's not great when we need to constantly grab the route's info at different moments in time. Angular exposes observables to listen for changes on route (route.params). The params prop is an observable, which will push values whenever route's params have been changed, so we can subscribe to it.

### vid.187

Query params are powerful bec. they allow us to stay on a resource without updating the entire page. We can add them to our routes to filter and sort through the data on a page; the key=value pairs 1st query placed after ? sign and subsequent ones after & sign joined together on the URL. The HTMLSelectElement type is def. by TS. We've freedom over the names of our query params, but generally if you're creating an API, the query params should have readable and concise names. Similar to our routes data the router will expose an observable for the routes params. We can subscribe to it for changes on the route. By def HTML elements will typecast an input's val as a str. Vals pushed by the observable will contain the latest vals from the query param. We can access them by their keyName. Typically we'll unsubscribe from the observable, however Angular will complete the observable when the component is destroyed. The router destroyes the component when the user navigates to a different page.

### vid.188

There are other ways for adding queries params. Intead of navigateByUrl we can use navigate method. navigateByUrl is the simpler one, which accepts a path as a string to redirect user to. The navigate method is more complex and powerful, which allows to customize the behavior of the router. 1st arg is an array of paths. We can construct a path by passing each segment separately as a stringto that array, and the URL will be constructed based on these values. By def the path is absolute. We can overwrite this by passing the 2nd arg, an object, to the navigate function, which contains a configuration settings for the router. The property relativeTo will allow us to change path from absolute to a relative, The value we path to it should be an instance of ActivatedRoute and this is the value relative to which we should change the path. We can add query parameters by adding queryParams prop to the same config obj. Its value should be an obj of query params you want to set (key:value pairs). Router will convert this obj to a string, which in turn would be appended to the URL. Query params can also be added to the routerLink directive. We may want to config the query param from the beginning. The [queryParams] prop is a part of the routerLink directive. We can add query params through this prop. The value to this prop must be an obj. The routerLink directive will convert the object to a string and append the query to the url.
Path params - should be used for returning a single resource or multiple resources
Query params - should be used for sorting/filtering through data

### vid.189

For dropdown selected value persistence after the refresh instead of ngModel directive we can bind the selected option

### vid.190

Angular doesn't auto handle invalid routes, so we should redirect the users when this situation occures. We can handle the unknown paths by creating a wildcard path.
// EX.

```
{
    path: '**',
    component: NotFoundComponent,
},
```

During the navigation process Angular will run path against the routes registered in our app. The moment it finds a match, it'll render a component related to the path. There occures a problem when the user heads to an invalid path and tries to get back to a valid one by navigation link. The not found page persists and no new page is rendered. This is a common problem. The reason the router renders not found component has to do with the order of routes registered in our app. Angular chooses to render components on a 1st come 1st served basis. We should place the wildcard route at the end, or otherwise not found page would always be rendered. Place the AppRoutingModule at the end of imports array in app module file so that it won't interrupt with other import modules.

### vid.191

As mentioned before we can redirect users to another route with routerLink directive or a set of functions. Browsers are capable of remembering the urls you visit. It's possible that prev url was saved in the browsers history. Our browser might recommend some prev. visited pages. We can handle the issue of old path getting recommended to a users who has previously visited it in two different ways. We can show the 404 page or redirect the user to a new path. The later solution is prefered when you're sure which path user intended to use. Add an object for that old route in the router array and then use redirectTo: "newPath" proprety. No need to use the component prop here.
// EX.

```
{
    path: 'manage-clips',
    redirectTo: 'manage',
  },
```

### vid.192

Users shouldn't be able to access spec routes based on their auth status. Currently users can navigate to pages using URL without any auth. Angulars routing library intoduces a solution for protecting the routes called guards, which are the functions that would run before the navigation is performed. They have the final say before the navigation. We can tell the router to reject the request. We can manually create a guard but angular/fire package already exports guards for checking the users auth status. We can use them to reject the autorisation to a specific route. 1st import AngularFireAuthGuard in the corresponding routing module. Next add the canActivate prop to the given route object in routes array, which accepts an array of guards to be run when the route is accessed.
// EX.
canActivate: [AngularFireAuthGuard]
We can modify the guards from the angular/fire package. We can use RxJS pipes to modify the behavior. We can import redirectUnauthorizedTo pipe, which will redirect the user to a page if they aren't auth to visit the route. When we add this pipe to our guard, we must pass a function that returns the pipe, which has 1 arg, the path to redirect user to. Next we can apply this pipe to the guard by adding it as a data prop. If this data prop is present in the route the guard will run the pipe function. It will only run if the guard rejects the req
// EX.
const redirectUnauthorizedToHome = () => redirectUnauthorizedTo('/');
and
data: {
authOnly: true,
authGuardPipe: redirectUnauthorizedToHome,
},
