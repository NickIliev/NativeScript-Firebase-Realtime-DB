# NativeScript Firebase plugin

<img src="docs/images/firebase-logo.png" width="116px" height="32px" alt="Firebase"/><br/>
Google's realtime app platform (Database, Authentication, Configuration, Notifications) [firebase.google.com](https://firebase.google.com/)

> Requires NativeScript 2.3.0 or up. So `npm install -g nativescript` like a boss if you need to!

## Features
For readability the supported features have been moved to their own README's:

* Setup and troubleshooting (continue reading below)
* [Realtime Database](docs/DATABASE.md)
* [Authentication](docs/AUTHENTICATION.md)
* [Remote Config](docs/REMOTECONFIG.md)
* [Cloud Messaging](docs/MESSAGING.md)
* [Storage](docs/STORAGE.md)
* [Crash Reporting](docs/CRASHREPORTING.md)
* [Analytics](docs/ANALYTICS.md)

## Prerequisites
Head on over to [https://console.firebase.google.com/](https://console.firebase.google.com/) and sign up for a free account.
Your first 'Firebase' will be automatically created and made available via an URL like `https://n-plugin-test.firebaseio.com`.

Open your Firebase project at the Google console and click 'Add app' to add an iOS and / or Android app. Follow the steps (make sure the bundle id is the same as your `nativescript.id` in `package.json` and you'll be able to download:

* iOS: `GoogleService-Info.plist` which you'll add to your NativeScript project at `app/App_Resources/iOS/GoogleService-Info.plist`

* Android: `google-services.json` which you'll add to your NativeScript project at `app/App_Resources/Android/google-services.json`

## Installation
If you rather watch a video explaining the steps then check out this step-by-step guide - you'll also learn how to
add iOS and Android support to the Firebase console and how to integrate anonymous authentication:
[![YouTube demo](docs/images/yt-thumb-setup.png)](https://youtu.be/IextEpoIzwE "YouTube demo")


From the command prompt go to your app's root folder and execute:

```
tns plugin add nativescript-plugin-firebase
```
_This will guide you through installing additional components. Check the doc links above to see what's what. You can always change your choices later._

### Config
If you choose to save your config during the installation, the supported options may be saved in the `firebase.nativescript.json` at the root of your app.
This is to ensure your app may roundtrip source control and installation on CI won't run the questionary during install.

You can reconfigure the plugin by going to the `node_modules/nativescript-plugin-firebase` and running `npm run config`.

You can also change the configuration by deleting the `firebase.nativescript.json` and reinstalling the plugin.

### Android
Install the latest packages 'Google Play Services' and 'Google Repository' in your [Android SDK Manager](http://stackoverflow.com/a/37310513)

#### Google Play Services Version
The plugin will default to version 9.8.0+ of the Android `play-services-base` SDK.
If you need to change the version (to for instance the latest version), you can add a project ext property `googlePlayServicesVersion` like so:

```
//   /app/App_Resources/Android/app.gradle

project.ext {
    googlePlayServicesVersion = "+"
}
```

## Usage

If you want a quickstart, [clone our demo app](https://github.com/EddyVerbruggen/nativescript-plugin-firebase-demo).

### Start-up wiring
We need to do some wiring when your app starts, so open `app.js` and add this before `application.start();`:

##### JavaScript
```js
var firebase = require("nativescript-plugin-firebase");

firebase.init({
  // Optionally pass in properties for database, authentication and cloud messaging,
  // see their respective docs.
}).then(
    function (instance) {
      console.log("firebase.init done");
    },
    function (error) {
      console.log("firebase.init error: " + error);
    }
);
```

#### TypeScript
```js
import firebase = require("nativescript-plugin-firebase");

firebase.init({
  // Optionally pass in properties for database, authentication and cloud messaging,
  // see their respective docs.
}).then(
  (instance) => {
    console.log("firebase.init done");
  },
  (error) => {
    console.log("firebase.init error: " + error);
  }
);
```

## Known issues on iOS

#### Authentication failed: invalid_token
On the simulator you may see this message if you have more than one app with the Firebase SDK ever installed:

```
[FirebaseDatabase] Authentication failed: invalid_token (Invalid claim 'aud' in auth token.)
or
[FirebaseDatabase] Authentication failed: invalid_token (audience was project 'firegroceries-904d0' but should have been project 'your-firebase-project')
```

This is [a known issue in the Firebase SDK](http://stackoverflow.com/questions/37857131/swift-firebase-database-invalid-token-error).
I always use a real device to avoid this problem, but you can pass an 'iOSEmulatorFlush' option to init.
```
firebase.init({
  // Optionally pass in properties for database, authentication and cloud messaging,
  // see their respective docs and 'iOSEmulatorFlush' to flush token before init.
  iOSEmulatorFlush: true
}).then()
```

#### Pod dependency error
If you see an error like `Unable to satisfy the following requirements: Firebase (~> 3.3.0) required by Podfile`,
then check [issue 98](#98) which perfectly explains how to update your local Pod spec repo, or first try
to `tns platform remove ios && tns platform add ios`.

Running `pod repo update` on the command line will make sure you have the latest Podspec,
so when the plugin updates and a newer Firebase version can't be found, try that first.

## Known issues on Android

#### Genymotion
You can use the awesome [Genymotion emulator](https://www.genymotion.com/)
but you'll need to [install Google Play Services on it](https://inthecheesefactory.com/blog/how-to-install-google-services-on-genymotion/en) or you'll run into errors during authentication.

#### DexIndexOverflowException
```
com.android.dex.DexIndexOverflowException: method ID not in..
```

Congrats, you ran into [this issue](https://github.com/NativeScript/android-runtime/issues/344)
which can be solved by adding `multiDexEnabled true` to your `app/App_Resources/Android/app.gradle`
so it becomes something like this:

```
android {  
  defaultConfig {  
    applicationId = "__PACKAGE__"  
    multiDexEnabled true
    generatedDensities = []
  }  
  aaptOptions {  
    additionalParameters "--no-version-vectors"  
  }  
}
```

#### java.lang.OutOfMemoryError: GC overhead limit exceeded

Increase the Java Max Heap Size like this (the bit at the end):

```
android {  
  defaultConfig {  
    applicationId = "__PACKAGE__"  
    multiDexEnabled true
    generatedDensities = []
  }
  aaptOptions {  
    additionalParameters "--no-version-vectors"  
  }
  dexOptions {
    javaMaxHeapSize "4g"
  }
}
```

#### FirebaseApp with name [DEFAULT] doesn't exist
Another possible error is "FirebaseApp with name [DEFAULT] doesn't exist." which will be solved by
placing `google-services.json` to `platforms/android/google-services.json` (see above), and making
the changes to `build.gradle` which are mentioned above as well.

#### Could not find com.google...
And there's this one: "Could not find com.google.firebase:firebase-auth:9.4.0". That means
making sure you have the latest `Google Repository` bits installed.
Just run `android` from a command prompt and install any pending updates.

Also, an error like "Could not find com.google.firebase:firebase-core:9.0.0" can be caused by having
more than one version of the Android SDK installed. Make sure ANDROID_HOME is set to the Android SDK directory
that is being updated otherwise it will seem as though your updates have no effect.

#### Found play-services:9.0.0, but version 9.X.Y is needed..
Update your Android bits like the issue above and reinstall the android platform in your project.

## Credits
The starting point for this plugin was [this great Gist](https://gist.github.com/jbristowe/c89a7bcae7fc9a035ee7) by [John Bristowe](https://github.com/jbristowe).
