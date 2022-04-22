# Clips

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Description of the Section 15:

In this section we were mainly working ffmpeg and webassembly. We added the functionality of taking snapshots from the uploaded videos and presenting them to users to be selected. We have touched a topic of sharedArrayBuffer, converting video snapshots to a binary and BLOB URLs and bypassing the Angular DOM sanitization. We also touched a topic of adding headers to reqs in angular.json.

## Topics covered in Section 15:

- Intro to ffmpeg + ffmpeg.wasm pack
- Configuring settings for different commands under the architect option in angular.json file
- Intro to web workers and sharedArrayBuffer
- Enabling sharedArrayBuffer by adding Cross-Origin-Opener-Policy and Cross-Origin-Embedder-Policy to the headers of reqs
- Writing video files in ffmpeg separate memo by converting them to binary first
- Running webassembly version of ffmpeg instead of CLI commands
- Converting binary snapshot of a video to a BLOB URL to be rendered by a browser
- genarating a separate pipe with ng g pipe command
- using DomSanitizer class and bypassSecurityTrustUrl function to bypass Angular's sanitization
- fetching file from a blob instead of a api url using fetch()
- using combineLatest, forkJoin operators

## Notes for the entire Section 15:

### vid.249

Generating a screenshot from a vid can be considered as an intensive task. While it's possible to create screenshots with JS, it would be much faster with web assembly. ffmpeg is a cross platform tool for processing video and audio files. We can interact with it through a cli just like in angular. This tool should be converted to a web assembly file. We have an option of doing it manually, but there is already a library in github repo called ffmpeg.wasm which we can use for our project.

### vid.250

ffmpeg is split into 2 packages, Core - ffmpeg tool converted into webassembly, and FFmpeg - a JS api for interacting with the core.
1st we need to install @ffmpeg/ffmpeg @ffmpeg/core packs.
Next we should install the @types/node to be able to use the types of node in typescript. We should add them to TS in the tsconfig.app.json under the compilerOptions prop.
// EX.
"types": ["node"]

### vid.251

One of the jobs of ffmpeg pack is to import the core package. We don't need to manually import it. It's a convenient feature but the problem is that files are loaded through http, and aren't bundled with our project. Angular provides a dev server for delivering files via the local server. By def files in the node_modules dir aren't publicly accessable through http. If we don't expose these files via http URL the ffmpeg pack won't be functional. Angular can be configured to deliver additional asset files. The architect option in angular.json file is an object of config settings for different commands of angular. We can config a specific command to modify the behav of that command. Add the following under the architect:
// EX.
{
"input": "node_modules/@ffmpeg/core/dist",
"output": "node_modules/@ffmpeg/core/dist",
"glob": "\*"
}
Internally angular installs node-glob pack for searching through folders. It's a pack for searching files with patterns

### vid.252

JS runs on 1 main thread. To handle the intensive, and demanding apps browsers use web workers, that are scripts running on a different thread than the main app. Web worker doesn't have access to doc. If it needs to send data to a main thread a message must be posted. Sending large data between web worker and main thread can freeze the app. A newer approach was to add sharedArrayBuffer, which is an obj shared between the main thread and web workers. Scripts from different threads can read and write to the same obj. If we insert large data to the shared buffer obj our app won't freeze. Browsers turn this feature off by def. After its intro a flaw was discovered leading to data hacks of different client browsers, fortunately it was fixed; still sensitive option. To enable the sharedArrayBuffers we need to add headers to the responses from our app, inside the angular.json. Under the serve command add the options prop which is an obj, to which we should pass a headers option. As we know html docs have head and body sections. The head sections describes the doc/metadata and body for representing data. This separation info can be applied to reqs and resps. Whenever we perform a req, browsers will split the req into 2 categories, header & body. Same is true when servers send responses. A request header is created by a browser and the response headers by the server. Angualr's dev server add response headers auto. If we need to enable SharedArrayBuffer feature additional features need to be added, therefore we need to configure the server. Browsers are expecting 2 headers:
"Cross-Origin-Opener-Policy": "same-origin",
"Cross-Origin-Embedder-Policy": "require-corp",
By adding these headers browsers will enable the sharedArrayBuffers feature which is required by the ffmpeg pack.

### vid.253

We need to add ffmpeg to a separate service as it's a large pack. The createFFmpeg() function will return a new instance of an ffmpeg class. It will log errors if any. createFFmpeg creates an instance but doesn't load webassebly file. To load the ffmpeg use load() function on the ffmpeg instance.

### vid.254

While ffmpeg pack is being downloaded we should prevent users from uploading the videos.

### vid.255

Internally ffmpeg will create a separate storage for files. Without separ memo storage system loading files, especially video ones, can cause our app to lag. Generating the screen shots will require storing the user's upload in memo. We have to first convert videos to binary before storing them as we did with imgs in mini project. ffmpeg's fetchFile helper function will help us to convert file to a binary representation. Storing the data in memo isn't performed by this function. FS() function (file system), gives us access to the pack's independent memo system. We can read and write files to this system.
// EX.
const data = await fetchFile(file);
this.ffmpeg.FS('writeFile', file.name, data);
After successful upload of a video ffmpeg will log a small info about the upload indicating that the file was successfully written to the memo.

### vid.256

After saving the video files in memo we can start to generate screenshots. ffmpeg comes with 3 tools. 1st is ffmpeg itself, which will process video and audio files. This is the tool for generating shcreenshots. 2nd is ffplay which is a tool for playing the media files. 3rd is the ffprobe, which can read files but can't process them; userful for reading metadata from the file.
Regardless of what you're trying to do ffmpeg is initialized with the ffmpeg command. Next we can add [global_options]. After that we can begin configuring the file using {[input_file_options] -i input_url}. Lastly we can start config the output using {[output_file_options] output_url}.
As we're using the webassebly version of ffmpeg we should run it first with run() function, as we'll do it in CMD. Next we pass all the prev mentioned commands within that run function.

### vid.257

Instead of running 3 ffmpeg funtions to process video frames and take snapshots separately we can run one extensive function to process the whole video at once, by passing multiple inputs and outputs under it.

### vid.258

Our screenshots will be stored as a binary data. Browsers don't allow us to display an img with a binary data. We must set an img tag's src attribute to a url, therefore we need to convert a screenshot from a binary array to a string. The readFile option passed to the FS function will indicate ffmpeg to read the file. There is a feature called BLOBs (binary large objs) for creating URLs. Note that blobs are immutable. By converting the binary data to a blob we would be able to render the screenshot. The buffer prop contains the actual data of a file. We can use JS's createObjectURL by passing a blob obj to it to creatae a URL.
// EX.
const screenshotURL = URL.createObjectURL(screenshotBlob);

### vid.259

Behind the scenes angular likes to sanitize our data before rendering the template. It's a security feature automated by angular. Unfortunately it will cause a problem with our images. Hyperlinks and img sources are sanitized by angular. If angular doesn't trust the URL, it will prefix the URL with the word unsafe, which in turn will cause the browser to throw an error and preventing an img from appering on the page. Angular has a class for bypassing the sanitization. Bypassing sanitization will require modifics to URL. Pipes are ideal for this purpose. In the cmd we can create a pipe by running ng g pipe pipeName command. It's auto registered in modules file and 2 files are created. Pipes are decorated with @Pipe decorator, the min config for which is its name. PipeTransform interface is implemented by the class, which will force the class to define a method called transform. Angular will call that transform to process the val, so we can write our logic inside this method. The DomSanitizer class is an injectable service for bypassing the angular's sanitization. The bypassSecurityTrustUrl function will accept a URL and return an obj called SafeUrl. Angular will wrap our url with this obj and during the sanitization it won't touch our url.

### vid.260

We should prevent user from uploading new videos while ffmpeg is procesisng the previously updated video for snapshots.

### vid.261

We shoud enable the user to select 1 screenshot to represent their video. We should visually indicate the selected snapshot.

### vid.262

We should update our previously defined rules for firebase to accept images as well. Parenthesis will group a pair of conditions.

### vid.263

Blobs are accepted by firebase. For that we need to convert our urls back to blobs. The urls created by our app are blob urls, which point to our system's memo. We're allowed to access our files through these urls. Normally we'd run the fetch function with api urls, however it's completely acceptable to fetch a file from a blob. Modern browsers will understand that file is from the users memo. We can grab the file by passing the blob function to the response by the fetch. Now we should grab the blob from the url using the function we denife.

### vid.264

The upload progress bar should take into account both video and img uploads. Since we're dealing with uploads we'll be dealing with doubling the observables. It would be necessary to merge the observables into a single observable. CombineLatest operator will subscribe to multiple observables and stream it as one value as mentioned before.

### vid.265

We need to add a screenshot url to corresponding doc we save in DB. forkJoin operator will accept an array of observables. Vals aren't pushed to the subscriber until all observables have been completed. Upon completion the latest vals pushed by each observable are streamed to the subscriber. Note that observables must be passed with an array wrapped around them.

### vid.266

If user deletes a clip, the corresp. screenshot should be deleted as well.
