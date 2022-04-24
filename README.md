# Clips

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Description of the Section 16:

In this section we were mainly working on proper video content representation. We have used the infinite scrolling feature to load new videos each time user scrolls to the bottom of the page. We added the necessary player buttons to selected video using video.js framework, copying feature to clipboard and lazy loading for the necessary videos only.

## Topics covered in Section 16:

- Application of Infinite scrolling
- What are CORS, Same-origin & Cross-origin policies, crossorigin attribute
- Creating cors.json file and communicating with google cloud services using gsutil
- Integrating and using Video.js framework for videos
- Using Clipboard API for copying video links to user's clipboard
- Lazy loading the video files using wabpack's chunk feature

## Notes for the entire Section 16:

### vid.267

Infinite scrolling is highly popular solution for browsing through data

### vid.268

On home page we should listen for scroll events and when user reaches the end of a page we should load new video contents.

### vid.269

As mentioned earlier, components get destroyed when a user navigates to a different page. We can use a lifecycle function to destroy the scroll event. Removing an eventlistener is always an important step if you're working with an event system outside of Angular. If the innerHeight + scrollTop prop vals = offsetHeight we can start loading new videos

### vid.270

We should grab the latest uploaded video files from firebase and limit them to a specific amount using limit() funtion, otherwise firebase will return all the videos from the DB. On subsequent requests we should tell firebase not to grab the same videos. We have a funtion defined in firebase for getting next batch.

### vid.271

We should grab the videos from the DB at the very beginning when the app is loaded and each time when the user scrolls to the bottom of the page

### vid.272

A resource can be considered videos, imgs, fonts, web pages, general asset files. Req a resource can be dangerous, like downloading a mallicious resource. Browsers introduced policies called cross-origin-resource-sharing (cors). Browsers allow sites to download resources from the same site, known as Same-origin policy. On the other hand when site A wants to download resources from site B we have the situation of downloading resources from different servers or origins, known as Cross-origin policy. Most browsers will allow including images without any problem. In the angular.json file we added Cross-Origin-Embedded-Policy: require-corp, which enforces stricter standars on our app. It won't allow our app to load cross-origin resources without permission. It's easy to add headers to our dev server, but this time we need to add headers to firebase's servers. We can give a permission by adding the following headers:
Access-Control-Allow-Origin: \*
or more specifically
Access-Control-Allow-Origin: example.com

### vid.273

The crossorigin attribute will inform the browser of the resource located at an external resource. We need to add this attribute to the element tag whenever we're trying to retrieve resources on cross origins. As firebase is owned by google, fireapp's data is stored on google clouds infrastructure. Think of firebase as an additional layer. Adding headers isn't configurable through firebase. We must handle it from our google cloud account. Google cloud's platform can read the cors.json file for config its cross origin settings. Create that file in the root dir, and add an array of object for config options.
// EX.

```
[{
"origin": ["*"],
"responseHeader": ["Content-Type"],
"method": ["GET"],
"maxAgeSeconds": 3600
}]
```

After the config. the last step is to upload that file to google cloud. gsutil is a python program for communicating with the google cloud services through the CLI. We can use this tool to upload our config file. Install it to your system first. Now to upload the cors.json run the following command: gsutil cors set cors.json <linkToFirebaseStorage>. DON'T FORGET TO LOG IN TO YOUR ACCOUNT WITH GSUTIL AND GIVE IT AN ACCESS PERMISSION, using gcloud auth login first.

### vid.274

Pipes can be created with the ng g pipe command. The @Pipe decorator will tell the Angular to register our class as a pipe. The PipeTransform interface will force our class to define a method called transform, which is called by the angular when we add the pipe to an expression. Pipes aren't injectable. We can make their class injectable by registering them in a component class for module. By injecting our pipe to a component class it would be available to all modules that use that component. The toDate function would convert the timestamp into a date obj. The date pipe is a very common type of pipe to use, but there are cases when you can have an incompatible val. Rather than recreating the Date pipe you can create a custom pipe to act as a layer between the val and a date pipe

### vid.275

Video.js is a framework built on top of a browser's html5 video player. There are 2 big benefits for using this library. 1st video players can have their appearence customized. 2nd there are numerous plugins to extend the def behavior. 1st install it by running:
npm i video.js @types/video.js @videojs/themes

### vid.276

The video element should be exposed to a component class. By def angular doesn't expose elements to the class. We need to manually query the template for an element. There is a decorator for this spec. situation. 1st add the #templateVar to an element we want to select. The @ViewChild() target will perform a query on the template. With this decorator we can select components, directives, and regular html elements. If we're selecting an html element it should have templateVar. Whenever we're selecting elems with the ViewChild decorator, the prop will store an instance of an ElementRef class.
The ngOnInit function has an access to the template however we aren't guaranteed that the template is ready. If we try to access an element inside a loop or condition it may not be easily accessable. For this reason props decorated with the ViewChild decorator should be accessed from ngAfterInit function. The ViewChild decorator has the 2nd arg, an obj with some options. By setting static prop in that obj to true the viewchild decorator will update the prop with the element before the ngOnInit function is called

### vid.277

The videojs function will help us with creating a player, but before creating it we need to create a prop for storing the player instance

### vid.278

To import the core styles for videojs player and themes add:
@import "~video.js/dist/video-js.css";
@import "~@videojs/themes/dist/forest/index.css";
to the corresponding components stylesheet file, where the video is displayed + additional custom css styles.
As noted earlier, behind the scenes Angular will encapsulate CSS to a single component by adding some unique ids. This feature isn't always reliable. Some CSS can't be perfectly encapsulated. We can disable the view encapsulation by configuring the component's options. 1st import the ViewEncapsulation enumerator. Enumerators are spec type of obj for storing a list of vals, which restrict the elements to a specific type.
Passing encapsulation: ViewEncapsulation.None, to Component decorator will disable the encapsulation. By removing the encapsulation Angular won't fiddle our styles. It was causing an issue with our player's functionality.

### vid.279

Working with media can be tricky. Videos come in various shapes and sizes. The width and height need to maintain a consistent aspect ratio. There is a Tailwind plugin for generating classes to add an aspect ratio into an element, called @tailwindcss/aspect-ratio. Note that tailwind 3.x ships with a spec class for aspect ratios, but safari doesn't support that, so better use this plugin instead. Next load this plugin by reuiring it under the plugins in tailwind.config.js. Now we have access to preset classes that we can apply to videos. Use 16x9 aspect ratio

### vid.280

We need to dynamically render a different video based on the url. A resolver is a function for retrieving a data for page component. The Router will run this function before loading the component. The 1st step is to implement the interface, using the Resolve class. The ActivatedRouteSnapshot class will store the info on the current route being visited. We can use it to access routes params. RouterStateSnapshot class will store the current repres. of our routes in a tree. By def resolvers aren't auto registered with a route. We must manually register a resolver. Inside an object for defining a route we can add the resolve prop, which is an obj of resolvers. Angular will search for a function called resolve in our service and if it's available it will be called whenever a user visits this route. The data returned by the resolver function can be accessed through the prop's name in this obj

### vid.281

The date pipe isn't injectable in our component, but we can make it injectable by adding it to the providers array.

### vid.283

Copying the video link to user's clipboard will provide a better user experience. There are 2 APIs for copying data to the clipboard, Clipboard API and the execCommand. 1st one is more modern approach and the later one is tradittionally used to copy the content to the user's clipboard (DEPRECATED). The location obj is def by the browser. It contains the info on the current location of the browser. location.origin will return us the base url. Clipboards can be accessed through the navigator.clipboard obj and the writeText() function called on it will add the text to the user's clipboard.

### vid.284

We should only load the code the user needs right now. Lazy loading is a feature for addressing this problem. We can break our app into chunks. Processing an app is done with the webpack. Angular cli configures it for us. The idea of a chunk is webpack's feature, which describes pieces of your app. By def webpack bundles your app to as few files as possible. We can overwrite this behav by manually telling the webpack to keep a chunk out of the bundle while at the same time load the chunk when it's needed. So the file gets downloaed when we instruct webpack to do so. We can lazy load entire video module when the user visits the manage or upload pages. Inside an object for a route we need to define a path with an empty string val and a loadChildren prop, instead of the component prop, which can be used to load a module dynamically, so we have to pass an async function to it. We can directly import a module in that async function with the import function.
Webpack isn't aware of types and vals exported by a module. We need to explicitly tell webpack where to find a module class
// EX.

```
{
    path: '',
    loadChildren: async () =>
        (await import('./video/video.module')).VideoModule,
},
```

Finally remove the reference to the given module from the app.module file.
