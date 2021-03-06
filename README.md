[![Build Status](https://travis-ci.org/ferborva/webrtc-int.svg?branch=master)](https://travis-ci.org/ferborva/webrtc-int)

# Web Streams Simplified Interface

Goals:
- Obtain list of available inputs
- Obtain list of supported video and audio constraints
- Get User media
- Detect custom screenshare extension
- Request screenshare extension
- ES6 Syntax
- Travis CI


## API

The following API enpoints are available:
- [listDevices](#list-devices)
- [listDevicesP](#list-devices)
- [listInputDevices](#list-devices)
- [listInputDevicesP](#list-devices)
- [listSupportedConstraints](#list-media-constraints)
- [checkExtension](#get-screen-share-mediastream)
- [checkExtensionP](#get-screen-share-mediastream)
- [getScreen](#get-screen-share-mediastream)
- [getScreenP](#get-screen-share-mediastream)
- [getMedia](#get-user-mediastream)
- [setTestConstraints](#get-user-mediastream)
- [stopAllTracks](#manage-media-tracks)


## Documentation

Each of the following sections explains the mode of use of each of the functions and objects made available in the module.

To start using the module clone the repo into your `node_modules` folder:

`npm install git+https://github.com/ferborva/webrtc-int.git --save`

Then require/import it into your front-end project:

eg. `import WebStreams from 'webrtc-int';`

For the module to work you will need to leverage a build system which makes use of Babel (ES6 to compatibile syntax) and Browserify/Webpack or one alike.

Good examples of ready to use development systems are the _EmberCLI_ and _Meteor Project_. Indeed there are many more that can be used.

###### Note:

The module offers API endpoints which use either Promise based results or Task objects to the user in order to offer a greater flexibility in the use. Notice that the _Task versions are objects_ where as the _Promise versions are functions_ that have to be invoked before they are managed.


### List Devices
##### listDevices:: Task - Enumerate all devices avaible
Type: _Task_

```Javascript
WebStreams.listDevices
         .fork(error => {
            // Handle error
          }, results => {
            // Handle Array of results
          })
```

##### listDevicesP:: Promise - Enumerate all devices avaible
Type: _Function_

Return: _Promise_

```Javascript
WebStreams.listDevicesP()
         .then(results => {
            // Handle Array of results
          }, error => {
            // Handle error
          })
```

##### listInputDevices:: Task - Enumerate all Input devices avaible
Type: _Task_

```Javascript
WebStreams.listInputDevices
         .fork(error => {
            // Handle error
          }, results => {
            // Handle Array of results
          })
```

##### listInputDevicesP:: Promise - Enumerate all Input devices avaible
Type: _Function_

Return: _Promise_

```Javascript
WebStreams.listInputDevicesP()
         .then(results => {
            // Handle Array of results
          }, error => {
            // Handle error
          })
```

__List Device possible Error messages. These apply to the above calls:__
- Get User Media not supported
- Enumerate devices not supported
- InternalError on enumerateDevices API


### List Media Constraints
##### listSupportedConstraints:: Enumerate all media constraints supported by the browser
Type: _Function_

Return: _Array_

```Javascript
const results = WebStreams.listSupportedConstraints()
```


### Get Screen Share MediaStream
##### checkExtension:: Task - Check for the Screen Share extension availability
Type: _Task_ (Predicate)

```Javascript
WebStreams.checkExtension
         .fork(error => {
            // Handle error
          }, ok => {
            // Handle ok
          })
```

##### checkExtensionP:: Promise - Check for the Screen Share extension availability
Type: _Function_

Return: _Promise_ (Predicate)

```Javascript
WebStreams.checkExtensionP()
         .then(ok => {
            // Handle ok
          }, error => {
            // Handle error
          })
```

##### getScreen:: Task - Enumerate all devices avaible
Type: _Task_

```Javascript
WebStreams.getScreen
         .fork(error => {
            // Handle error
          }, result => {
            // Handle MediaStream result
          })
```

##### getScreenP:: Promise - Enumerate all devices avaible
Type: _Function_

Return: _Promise_

```Javascript
WebStreams.getScreenP()
         .then(result => {
            // Handle MediaStream result
          }, error => {
            // Handle error
          })
```

__Get Screen Share possible Error messages. These apply to the above calls:__
- Screen Share extension is not installed or disabled
- Screen Share extension not responding
- Screen Share permission denied by user
- Get User Media not supported
- Only secure origins are allowed
- InternalError on getUserMedia API


### Get User MediaStream
##### getMedia:: Promise
Type: _Function_

Param: _constraints_ ; Type: _Object_ ; Values: [MediaStreamConstraints](https://developer.mozilla.org/en/docs/Web/API/MediaStreamConstraints) dictionary

Return: _Promise_

```Javascript
WebStreams.getMedia(constraints)
         .then(result => {
            // Handle MediaStream result
          }, error => {
            // Handle error
          })
```

Examples of constraints:

```Javascript
const ex1 = {
  video: true
}

const ex2 = {
  audio: true
}

const ex3 = {
  video: true,
  audio: true
}

const ex4 = {
  video: {
    width: 160,
    height: 120
  },
  audio: {
    echoCancellation: true
  }
}
```

__Test Mode__
Available for low resolution options. To use the test mode constraints call `getMedia` with:

```Javascript
const constraints = {testMode: true}

WebStreams.getMedia(constraints)
         .then(result => {
            // Handle MediaStream result
          }, error => {
            // Handle error
          })
```


__Get User Media possible Error messages:__
- Get User Media not supported
- At least one of audio and video must be requested
- Only secure origins are allowed
- InternalError on getUserMedia API

##### setTestConstraints:: Change the Test Mode constraints objetct used
Type: _Function_

Param: _constraints_ ; Type: _Object_ ; Values: [MediaStreamConstraints](https://developer.mozilla.org/en/docs/Web/API/MediaStreamConstraints) dictionary

Return: Object

```Javascript
WebStreams.setTestConstraints(constraints)
```

By default the testing constraints used are:

```Javascipt
{
  video: {
    height: 120,
    width: 160,
    frameRate: {
      ideal: 5,
      max: 10
    },
    facingMode: 'user'
  },
  audio: {
    echoCancellation: true,
    volume: 1
  }
}
```


### Manage Media Tracks
##### stopAllTracks:: Stop all active tracks
Type: _Function_

Return: Either Type

```Javascript
WebStreams.stopAllTracks()
```

This function will go through all the cached MediaStreams, look for the active tracks on them and stop the tracks. Helper function used to clear the browser's "recording" state.


### Tests
Unit tests are run using [Mocha](https://mochajs.org/). You can install it with the following command:

`npm install -g mocha`

and run the tests with:

`mocha` or `npm test`


### Ramda subset used

- compose
- composeK
- filter
- map
- flatten
- isNil
- prop
- chain
- test
- curry

Build command:

`./scripts/build -- src/chain.js src/filter.js src/map.js src/flatten.js src/curry.js src/isNil.js src/prop.js src/is.js src/test.js src/compose.js src/composeK.js > dist/ramda.custom.js`

