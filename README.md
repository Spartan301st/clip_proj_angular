# Clips

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Description of the Section 10:

In this section we where working on user validation. We created Firebase firestore DB to store the user data, and auth service to authentificate him/her after the login and registration. Plus we have used some RxJS operators, and environmental variables

## Topics covered in Section 10:

- create a DB in Firebase
- exploring rules we can arrange for firestore DB
- @angular/fire package with useful methods
- using ng add command
- defining environmental variables in angular
- auth service of firebase
- What are Buckets, Collections and Documents, and how to create them
- Creating modles with interfaces and classes
- add() & doc() methods in firebase
- modifying the db rules in Firestore
- indexedDB fro storing token
- Stateful vs stateless auth
- using ;else condition in ngIf directive
- using async pipe operator in template
- checking whether user has logged in before loading angular
- removing the teleported coponent with removeChild
- using delay() pipeable operator
- delteting token with the logout
- Web tokens

## Notes for the entire Section 10:

### vid.141

Auth isn't a feature exclusively handled by a frontend, but a shared responsibility between front and backend.
We can use Firebase as a quick solution for backend and server. It can store your data, auth users, store files, provide analytics, etc.
Go to Firebase's website and click on go to console -> add project. After filling some inputs and creating a new app we need to turn on the DB. Select the Firestore DB -> create database and select the test mode for development purposes.

### vid.142

Head to firestore d. -> Rules to see the rules applied to our db. We can modify them from the online editor.
rules_version - for version of the rules. Latest one V2 comes with newer features. Creating rules is similar to creating css props. The 1st step of applying rules is to select where the rules should be applied to. After selection we can begin adding rules. Firebase offers various products it calls services, for which you can have different rules. After selecting a service (cloud.firestore) we are adding {} for grouping the rules together. Any time a request is made to the db it must be to a spec resource. the match keyw can check if the a check was made to a particular resource. The databases dir is where the DBs are stored. You can have multiple DBs for a firebase app (in Premium plan).
// EX.
/databases/{database}/documents
Here {database} is replaced with your DB's name
/{document=\*\*}
Selecting any doc regardless of their name
Finally the rules are applied to those selected docs

### vid.143

A firebase sdk (software dev kit) is a library for connecting our app with firebase's products. There are 2 primary options for installing the firebase with CDN or package. Firebase sdk can be used with any JS framework without changes. AngularFire is an official package. It exports services for interacting with firebase's products. Use ng add @angular/fire to be able to use it in our angular project.
We can install packages with npm intall. Angular cli comes with a command for helping us install packages called ng add. The main difference between ng add and npm install is how they handle the package installation. Npm will install and update the package. Angular cli will search for installation instructions inside the package and if it finds any they'll be executed. Packages can config our project, create files and help us integrate a package into a project. Note that not all packs can be installed using this command. Packages might also ask some additional questions during the installation.

### vid.144

We need to import the @angular/fire package manually. 1st grab your api keys. On the dashboard select the web app, and give your app a nickname. Firebase will present us a code snippet for integrating firestore to our app. The most inportant part is the obj assigned to firebaseConfig. Copy it. src/environment dir is for environment files where we can store config settings for external apis. We have 2 environment files, one for dev, and one for prod. In both of them add prop firebase with the obj that you've copied from the code snippet.
apiKey - for connecting to firebase
authDomain - url for handling the auth credentials
projectId - id of our project
storageBucket - used to describe the location where the files are stored
messagingSenderId - used to push notifications between applications
appId - unique id for our web app
Now in app module import AngularFireModule, and environment and add AngularFireModule.initializeApp(environment.firebase) to imports section to initialize and establish the connection. Firebase has devided features in different modules. If we wantto interact with a spec feature we'll need to import a module for it. For angular's authentification feature we can import AngularFireAuthModule from @angular/fire/compat/auth and add it to imports

### vid.145

We need to turn on the auth feature in firebase before we can register the user by submitting their data. Click on the Authentication -> get started on the dashboard. U nder the Sign-in method tab we can select the options for signing in with providers. Select Email/Password option for simple email registration. Now we can start adding users to our firebase app. Next step is to send the data to the firebase. In the function that hadles the registration we need to expose the firebase's methods in this component. The modules that we import will export the services and expose the firebase's functions. They can be injected directly into our component. import AngularFireAuth and inject it through constructor function. AngularFireAuth promise proxies an initialized firebase.auth.Auth instance, allowing you to log users in, out, etc. It will give access to different methods including createUserWithEmailAndPassword which receives an email and password as an input and returns a promise, with user credentials in successful. Note that firebase will auto log the user in if his account was created successfully. We can find the email and password values that the user has provided under the registerForm obj. FormGroups have a prop called value, which is an object containing the values from the form controls
// EX.
const {email, password} = this.registerForm.value;

### vid.146

There are 2 possible responses we can receive from the firebase, an error or a success. Note that each user will be assigned a unique User UID. Note that during the phase when the registration is being processed we should disable the form submission.

### vid.147

If we want to store the additional info about the user we'll need to store it in the db. Unfortunately createUserWithEmailAndPassword will only store email and password.
In firebase's Firestore the following terminologies are frequently used:
Buckets - physical location where the data is stored. Multiple buckets can fbe created for one app in a Premium plan. By installing and config angular/firebase package we can connected to the bucket in firebase
Collections - containers for your data, used to organize data in separate locations (like folders in OS). We must select a collection before perf actions on the DB.
Documents - individula records in the collection. It's the data you store in DB (like files in OS).
The terminology is the same as in MongoDB for no-SQL DBs

### vid.148

Similar to before firebase offers a service for directly communicating with the db. We can inject the service into our component for performing various actions. Each service from the Firebase has a module. For direct firestore connection import AngularFirestoreModule in app module and add it to imports. Modules will expose the services, which are accesable in every component. Now to use this module import the AngularFirestore in forms component and add it to the constructor. The 1st step for using a collection is to create a collection. The collection function of AngularFirestore allows us to select a collection from our db, and it will create a collection if the collection doesn't exist in our DB. It only has one arg, the name of the collection to select. After selecting a collection we can push a document to it by chaining add() method to it, which receives one arg, an obj to be pushed as a document. Even though the auth service already stores the email it's still handy to store it in a DB. This will allow us to filter and sort through the data by email.
In Firestore Database we can see the collection, documents and data stored in those documents. Note that a random string is assigned as a name to our documents

### vid.149

instead of writing the same logic in multiple components, we should refactor our solution to a service, and whenever we need to create a new user we can inject this service. Rather that teaching the component how to use firebase services we can centralize the logic into one service, so our components can inject this service for creating users. This way we are injecting a layer of obstraction between libraries and components

### vid.150

interfaces are the features for creating custom types. Whenever we create interfaces they're considered to be models. A model is an interface/class for descr and manipul data in the DB. If you're creating an interface for an obj that doesn;t get stored in DB, it would just be called an interface. Whenever we create a collection we should pair it with a model, which will describe the docs/objects in the collection. We can store our models with .model.ts extension inside the models dir. In ts it's completely acceptable to create a new type with a class instead of an interface. In some cases projects may create models with classes instead of interfaces. Both interfaces and classes can type check data, but classes are a feature of JS and interfaces of TS meaning that they eventually have to be compiled back to JS syntax. Also interfaces don't get transpiled, while classes do. Once transpilation was checked, interfaces get deleted. Methods can be used in classes and not in interfaces. So basically go for interfaces if you need very basic models and use classes otherwise. One trick would be to start with interface and switch to class if the requirements grow.

### vid.151

Firebase is a very flexible DB meaning that data can be added with a little to no constraint. At any point of time we have the power to change the structure of a doc from add method. The better approach would be to restrict the structure of a document. By def TS is unaware of the type of data that should be added to the doc for a collection. To handle this we need to pass a generic. Note that we shouldn't store the user password in the DB. It's safer to let the firebase handle the passwords in the auth service.
AngularFirestoreCollection is a helper class for annotating the props in our services to a collection. We're informing the typescript that this prop will hold a ref to a collection, by using a generic

### vid.152

In firebase we store the user's info in two different services, the auth and DB service. We don't know which doc belongs to the given user in auth service. There is one common value between the two services, email, but it might change and we're obliged to chenge it in both services. In the Authentification section we can see that eah user is assigned a User UID, which is unique. Using this we can store a copy of this id with the users doc thus connecting the user accross the firebase services. Likewise firebase will assign a unique id to each doc. Instead of randomly generated id we can use the id assigned to the user in the auth service. We have to connect the services during the user registration. createUserWithEmailAndPassword must be called before adding a doc to the db. It returns a UserCredential object which contains an info that we need. It has 3 props. FIrebase has 2 functs for insertig data to the colelction. add() will insert the doc to the collection with a generated id. The doc() function on the other hand performs 2 actions. It will atempt to select the doc, and if it doesn't exist it'll generate a new one. Here we can assign a custom unique id to the doc. The set() function will add or modify the existing props in the doc. The auth service can store additional info about the user. Registered users come with the profile, where we can store a display name and a profile image

### vid.153

For reading we can allow anyone to view the data. For writing we ahve to restrict the permissions to auth users only.
// EX.
allow read: if true;
allow write: if request.auth.uid != null;
Every auth object comes with uid and token props. We're using the uid and if its val is set to null then it means that user isn't authenticated.

### vid.154

Most apps will log you in after creating an account. Auth is mainly handled on the server (Firebase). We have to send the login data to the server, which responds with a token and we then store that token. Tokens generally come in the form of a unique stream. Storage of the token is essential. Under the hood firebase uses the indexedDB. It's an api for storing the structured data on the user's browser. It's shipepd with the browsers and we don;t need to enable it somehow to start using it. After storing that token we can send it to the firebase with our reqs, where the user is verified by checking that token.
Traditionally apps track the users by a feature called sessions, which are stored on the server. Server keeps track of the auth users. This process is called a stateful auth. Firebase on the other hand won't keep track who is logged in, and instead it verifies the users with the token. With every req we send the token as well, which confirms the user. Server doesn't intentionally keep track who is logged in. This is what's called a stateless auth

### vid.155

Firebase will store the token on our behalf. In addition whenever we initiate a req, firebase will attach the token with our req. This includes DB reqs. The firebase sdk will store the token and send it with reqs. Note that we have to first register the user in auth service before we insert them into the DB, otherwise the token won't be available and the write req would fail

### vid.156

The angular/fire package provides an observable for the currently auth user. To subscribe to this observable inside the constructor function of the auth service call the subscribe function on the auth.user prop.
// EX.
auth.user.subscribe(console.log);
auth.user here is an observable returning a User or a null. This observable contains the info regarding the users account. The $ sign is a spec naming convention for ident props as observables; not required but is a common practice. This symbol should be added at the end of the prop name.
// EX.
in constructor:
public isAuthenticated$: Observable<boolean>;
to typecast to a boolean:
this.isAuthenticated$ = auth.user.pipe(map((user) => !!user));

### vid.157

Note that we should hide the login/register link when the user is already logged in. We can use directives to check that. In some situat. we may want to a different set of text if a condition in the ngIf directive fails. Angular supports else conditions in templates, similar to else blocks in vanila JS. After the condition we can add a ; followed by an else keyw after which we need to specify a template. Before we specify it we need to create one. Surround the necessary part within the template with the ng-template container and add a template reference var to it, with #refVArName. By creating a templ ref. var. we can pass it to the else condition the ngIf directive will render the template if the condition fails. Else is entirely optional. This approach works but there is a better one. Angular defines the async pipe operator for subscr to an observable from within the template. Instead of checking the isAuth prop, we'll check auth.isAuth observable directly. Note that async. Vals pushed by the observable will be give nto the directive or expression. We can use async pipe oper to subscr to observables from a template.
// EX.

<li *ngIf="!(auth.isAuthenticated$ | async); else authLinks">
<ng-template #authLinks>
...
</ng-template>
Whenever possible we should use the async oper. to handle the subscr. in the template (AsyncPipe).

### vid.158

Server Side Rendering/Static Site Generation.
Currently the Angular code gets initialized and only after that the Firebase, but this causes an unpleasant link changes when user is already logged int. We can change the oreder of the loading so that firebase gets rendered 1st and Angular after that. As we're trying to initialize Firebase manually in this case we need to install the official SDK in addition to Angular/firebase package. We should load it in main.ts, as this is the first file that gets loaded. Angular doesn't get loaded until we call the bootstrapModule function. We should initialize the firebase before this point. 1st import the firebase, and firebase auth. Then call firebase.initializeApp() for connecting our app to firebase, which receives a configuration object that we copied earlier. The next thing would be to listen to the event on the auth using firebase.auth().onAuthStateChanged(), where auth returns authentif. related info and onAuthStateChanged listens to it. We should pass a callback to onAuthStateChanged.
// EX.

```
firebase.initializeApp(environment.firebase);

let appInit = false;

firebase.auth().onAuthStateChanged(() => {
if (!appInit) {
platformBrowserDynamic()
.bootstrapModule(AppModule)
.catch((err) => console.error(err));
}
appInit = true;
});
```

The application panel in dev tools allows us to view the metadata of our app. There are various storage solutions. Firebase uses IndexedDB, where it stores users auth info

### vid.159

We can use AngularFireAuth's signInWithEmailAndPassword during the login process to authenticate the user

### vid.160

After submitting the login or registration form, the modal doesn't close if either forms were success. We should hide and destroy it after the successful submission. Otherwise we encounter a memo leak. If you have used a teleportation technique on a component, angular won't be able to remove it with a simple ngIf declaration. We need to use removeChild in ngOnDestroy directive

### vid.161

We don't want our app to jump from a state to state in an instant. We should delay the reaction. We can solve our dillema with the RxJS operators. There is an opperator called delay for delaying a val from being pushed to the subscription. It's a pipeable operator, which will push values supplied to it. Before pushing vals on to the next operator o subscription we can add a delay in ms. We can chain multiple pipes to create multiple observables

### vid.162

User may want to log out earlier than the token time expires, so we have to give him that option. We can use AngularFireAuth's signOut function for that, which will clear the credentials from the storage

### vid.163

Web tokens are encoded strs for storing data, used to transport data between client and the server. They're digitally signed, meaning that any changes to that token will auto invalidate it. We don't have to worry about encoding and decoding the token as sdk will handle it for us.
Tokens are generally generated on the backend. Check out JSON Web Tokens' website.
Web tokens aren't only for the JS and can be used with any progr. langs available.
Tokens are broken down into 3 sections:
Header - stores meta info about the token. It's an object with 2 props, the algo being used from among many and the type, which is usually JWT.
Payload - contents of the web token. It's an object filled with any type of data
Signature - used to verify the contents of the web token and is the most critical part of it. Here we have the header encoded with base64 + . + payload also encoded with base64 and lastly the secret key is added that can be anything you would like.
In the end every part is concat together. The concat string is hashed with the algo you set in the header. The result is added to the token.
In order to create a new signature we'll need to know the secret, so that's the extra protection against the hackers.
SSl or TLS is a standart for encrypt data when it's sent between client and server. This should be ahndle by the backend devs. There are hosting services that offer the SSL certificates along with the installation. Goodle will penalize the apps that don't have one. Firebase stores its token under the stsTokenManager
