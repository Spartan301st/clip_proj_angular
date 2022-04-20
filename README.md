# Clips

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Description of the Section 13:

In this section we were working on drag & drop functionality. Users now can either drag and drop their mp4 files or select them the old way for uploading. Videos are saved in firebase and retrieved when user is in manage page. We also added posting, updating and deleting options for each video from the manage page.

## Topics covered in Section 13:

- General overview of implementing the drag and drop functionality.
- Listening for events in the parent element with HostListener
- some events for drag and drop functionality like dragend, dragover, dragenter, dragleave, mouseleave, drop, drag, dragstart
- Mime types overview
- generating unique file names using uuid package and uploading them to firebase
- firebase storage rules modification
- percent, last pipes
- using ref() function for creating a reference to a file
- firebase's set() & add() function
- snapshots vs references
- using disable() and enable() methods on FormGroups to affect the FormControls within
- adding both drag & drop and input-file file upload methods
- canceling the uploads once the user navigates away before upload is over
- making queries to firebase for get, post, update and delete and reflecting them in manage page.
- using BehaviorSubject with combineLatest()
- creating composite indexes in firebase storage

## Notes for the entire Section 12:

### vid.193

Uploading a file is a shared responsibility between client and a server.
Client - transfers files to the server
Server - validate the upload, store the file, giving file permissions, create an API for the client to send the file
Firebase ships with all the necessary solutions. Uploading files in JS is optional. Uploading a file is 2 step process. 1st we ask the user to upload a file. When files are dropped on the dropbox, it will initiate an upload process. After uploading will present users with some options. Firebase comes with the feature called cloud storage, used for storing user generated content

### vid.194

Most browsers will load the file in the browser depending on the file type. This behavior will move them away from the app. We should prevent this behavior of the browser before proceeding with the upload. Preventing the behavior of the browser can be outsourced to a custom directive. Generate a new directive with the ng g directive <directiveName> command. If we want this directive to be useable in other modules we have to add it to experts array manually, and import it in other modules.
Directives are defined as classes decorated with the Directive decorator. We can pass in an obj to configure the directive. Selector indicates the name of the directive. We can inject services into directives through the constructor function. Usually we have to add an Injectable decorator to a class. We can avoid adding it, as Directive decorator will allow the class to be injected with the services. A host element refers to an element to which the Directive is attached to. Angular exports decorators for helping us access the host element. The HostListener decorator performs 2 actions. It'll select the host element, and listen for an event on the host. This decorator has two args, name of the event, in our case "drop". drop event can be triggered when the user releases their mouse or by pressing the escape key. After listening for this event we need to pass an event object from the element to our function. 2nd arg is an array of vals to pass on to the function. drop event isn't the only one that can cause the file to be oppened by the browser. There is another event called dragover, which is emmited when a selection is dragged over an element. This event can cause the file to be oppened. We have to prevent this behavior. We can apply HostListener twice to the event handling function. We aren't limited to a single decorator. Multiple decorators can be applied to a single method, even the same decorator
// EX.

```
@HostListener('drop', ['$event'])
  @HostListener('dragover', ['$event'])
  public handleEvent(event: Event) {
    event.preventDefault();
  }
```

Now we can apply the selector of this directive to an element to add this functionality.
// EX.

<div app-event-blocker>...</div>

Whenever we're dealing with events we should always try to stop the default behavior.
We have created a reusable directive. If we need to support other events, we can add multiple host listener decorators to our methods.

### vid.195

We need to highlight the dropbox when the user drags file over the upload box. We have to apply some event listeners to that box like:
dragend - element is no longer being dragged on
dragover - element/selection is being dragged on the element
dragenter - when smth is being dragged on the element
dragleave - when wmth that prev was being dragged is no longer dragged
mouseleave - when mouse is no longer being hovered on the element
drop - when smth is being dropped on the element
Other useful events migh be:
drag - when the element this event is applied to is being dragged
dragstart - when the element started to be dragged

### vid.196

Chrome won't log the files unless you access the files directly. Under the DragEvent obj ->dataTransfer -> files you won't be able to see the dropped files to the dropbox. If you're trying debug the drag & drop operations you need to access the props directly to see their vals. Simply logging the object will result in an empty array.
// EX.
($event as DragEvent).dataTransfer?.files.item(0) ?? null;
A mime type is a lable to identify the type of data in a file, similar to extensions except that they can't be changed easily. It's more practical to check for file's mime type rather than extension. Mime types are broken into 2 parts, type/subtype

### vid.197

setValue() function will programmatically update a formControl's val. We don't always have to wait for a user to input a val.

### vid.198

Handling the form under the dropbox once an mp4 file gets uploaded.

### vid.199

Firebase offers a service for hosting uploaded files from users. We use angular/fire package to communicate with the firebase. It comes with a module that exports services for interacting with the Firebase's cloud storage. We can use AngularFireStorage for that purpose. We can indicate the path to which our data should be passed in the Firebase. We can indicate the dir under which the files should be added and if there is no such dir it would be created auto. Note that Firebase won't check the contents of the duplicate named files, so it will overwrite the prev one with the most recent one. Firebase doesn't provide any solution for this issue, so we have to tackle it by creating unique named files. We can use the uuid package for that. We can also download @types/uuid for data types required by TS. We can use this.storage.upload() function for uploading data to firebase. It accepts 2 args, name of the file and the file obj

### vid.200

Going through the storage rules in Firebase. Don't forget to change default read and write rules, otherwise users won't be able to upload their videos to firebase.
// EX.
allow read: if true;
allow write: if request.auth != null
&& request.resource.contentType == 'video/mp4'
&& request.resource.size < 10 _ 1000 _ 1000;
Firebase has a function for checking multiple types if they're in a similar category, called matches()

### vid.201

Along with displaying the alert component the form should be disabled to prevent duplicate uploads.

### vid.202

We want to be able to let the user know if their upload is in progress, a success, or a failure. upload() function from the storage service returns an object with observables. This observables will push data related to the upload including the progress of the upload. We can save that observable in a var and immediately subscribe to it using percentageChanges().subscribe(). Angular ships a pipe for formatting the % values called percent. Note that this percent pipe will multiply the val by 100 so divide the val by 100 to reverse the changes.

### vid.203

If the upload fails we should update the error message to inform the user, and give him/her a chance to resubmit the video, otherwise show the success message.
A snapshot represents the current status of an upload. Similar to percentageChanges observable, but the main difference is the type of info pushed by the observable. Firebase will inform us with the bytesTransfered and totalBytes, so we can calculate the % of the upload. We can check the status prop of the last snapshot returned to us to check for upload status. We can use the last pipe for that purpose.

### vid.204

Note that we have to store the id of the user and the title of the uploaded video in the DB. Info about the user can be retrieve through the authService. The URL isn't easily accessable unless we create a reference. Only after that we can retrive the info about the file. Creating a reference is a separate action. The ref() function will create a ref to a file. After grabbing the ref we can access the public URL of the file. getDownloadURL() returns an observable

### vid.205

Interacting with clips in DB would be a common action in our app. We should create a separate service for that. We can constrain the data of our collection to a specific structure. import AngularFirestore for communication with the firebase, and AngularFirestoreCollection for structuring. We can use the collection() function to select the collection from our db. There are 2 methods for adding a document to a collection, the set() function we used to add the user to a collection and the add(). The difference is that the set() will allow us to assign a custom id to the doc. The add function will instruct the firebase to generate an id for us.

### vid.206

A reference is an obj pointing to a location in yur app. By pointing to a location we can read/write references. Refer. allow us to create other new references as well, enabling us to manage multiple locations.
Snapshot is an obj that is a copy of a location in your app. They're read-only and immutable. Whenever we make a change to the app, it's typical for firebase to respond with a snapshot. Snapshots make your app light-weight making your app faster. You can't create snapshots directly, but created for you during the events.

### vid.207

We should prevent the users from interacting with the upload form during the upload process. We can disable the entire form during that process. FormGroups and Controls can be disabled. For groups the entire set of controls are disabled. disable() function is available in all Groups and Controls. The enable() function performs the opposite action of the disable. It will enable the controlls from within a group.

### vid.208

Some most used versions of older mobile browsers don't support the drag & drop functionality. In this case we can use file-upload method. Place both dragand drop container and input(file) in an ng-container by adding the ngIf directive to show and hide that. Note that files uploaded by the input element are stored in a different location than drop events. They're stored under target -> files and note that we don't have the dataTransfer prop here. We should also ensure that we grab file from the correct place.
// EX.

```
this.file = ($event as DragEvent).dataTransfer
  ? ($event as DragEvent).dataTransfer?.files.item(0) ?? null
  : ($event.target as HTMLInputElement).files?.item(0) ?? null;
```

### vid.209

When you navigate to another page the component from the prev page gets destroyed. This applies to its children components as well. If the user navigates away from the upload page, we should cancel the request. We can use destroy lifecycle event for this purpose. During this lifecycle function we're going to cancel the upload before the component is removed from the doc. Uploads can be canceled from the task obj. Calling the cancel() function will stop upload operations to firebase.

### vid.210

The route param in the URL is the most important info in the video page. As every document in firebase stores a unique id we can use that id to render the corresponding video page

### vid.211

Creating a timestamp requires the firebase object. firebase package ships with a function for generating a timestamp compatible with our DB, called firebase.firestore.FieldValue.serverTimestamp. Every service offered by firebase can be found under a specific object

### vid.212

The id of the user can be retrieved through the authService. where() method creates and returns a new Query with the additional filter that documents must contain the specified field and the value should satisfy the relation constraint provided. We can create a condition to check if a prop matches a val. We can pass in 3 args for creating the condition. We have to create a condition for checking if the user id in a doc matches the id of the user logged in. Pass name of the doc, comparison operator and value to compare to. This will generate a query instructing the firebase to search through the docs in the clips collection. Lastly, we have to initiate the query with the get function. Note that the query result would be the QuerySnapshot obj with some props, the most useful of which is the docs, which will return the array of uploaded videos by the given user.

### vid.213

Grabbing the videos for the corresponding user.

### vid.214

We should show user all the available videos he/she has uploaded. Do it using ngFor directive, by looping through all the received videos in the array.

### vid.215

We should give the options to a user to edit their videos. Reminding that modal component will project the content passed to it. Every modal should have a unique id. Along with it we need to register our modals. When the user clicks on the edit button modal will be updated to contain the values from a specific clip

### vid.216

By keeping track of the current clip we can update the form accordingly

### vid.217

Angular manages to update the prop, but what if we want to be notified of changes to the components input props. Components have a lifecycle function to watch for changes, called OnChanges. This interface will force our component to define a method called ngOnChanges, which will be called whenever a components props are updated by a parent component. We can use this method to update our form controls when the active clip prop is modified. FormControls expose a method called setValue to update a formControl's value, as mentioned before. The control can be passed down to the component by binding the control prop to the title prop

### vid.218

We have learned how to insert and select data in firebase. Updating data won't be too different. This req should be initiated by our service. This way our components can update the clips. The doc() function allows you to select the doc by its id. The doc function will return an obj where we can access its data. In addition we have access to functions for interacting with the doc. The update() function will allow us to update any of the props inside of it. If we ommit a prop, firebase won't change its val. We can even add additional props.

### vid.219

As the user updates the title of his/her videos the update reqs are sent to the db, but the visual update of the manage page doesn't occure. We should listen for the changes from the parent component and reflect them to the child manage component. Use the Output & EventEmitter decorators + emit() function for that. Then on the child element selector tag use the (update) event listener and pass a function with $event for handling the update defined in the component class file. $event won't hold the simple data, but the data passed from the child element, so better annotate it

### vid.220

When removing the video from firebase we should remove the video from the storage and the document with the necessary info from the DB. A reference is an obj, that points to a specific file, and has methods and props for interacting with the file. Use ref() with the delete() method to delete the file. Note that deletion is considered a part of writing process in firebase, so the rules applied to write are applied to delete as well, unless you define it separately. The next step would be to delete the data from the collection. We need to select the doc for interaction with it. After selecting the document with doc() function we can call delete() function to delete that doc. Finally we should reflect this change instantly in the manage page. We can remove the deleted video from the view using the splice method.

### vid.221

Normally we can subscribe to an observables to wait for values pushed by the observable. Subscribers don't have the power to force the observable to push a new val. This isn't true for the behavior subjects. A subject can push a val while being subscribed to an observable. We can create an obj that acts like an observable and observer. Unlike other observables BehaviorSubject can be created with an operator. We must use it to instantiate an observable. Remember that $ is appended to props to identify the observables. A BehaviorSubject must specify the type of a val pushed to an observable with the generic. We need to pass an initial value to be pushed by the observable. Just like any other observable, we can subscribe to BehaviorSubject. combineLatest operator helps us with subscribing to multiple observables. Note that observables should be passed within an array to combineLatest. Whenever either observable pushes a value the combineLatest operator will push the val on to the pipeline. Along with the new val, vals from other observables will get pushed too. The vals will be the latest value from the other observables, therefore we'll receive values from each observable

### vid.222

An index tells the db how to sort a field in a DB. Firebase will auto create indexes for your data. An index is created for each prop in a doc. Firebase doesn't know how to sort UID or timestamp of videos. We can teach that to firebase. Head to firestore db -> indexes. Indexes are placed in 2 places. Composite and single field. Composite indexes are for teaching firebase how to sort data with multiple props.
