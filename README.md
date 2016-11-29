POC Application for usage of Firebase Realtime DB in NativeScript application.

Steps to recreate project from zero.

- Create Firebase account and add project.
- Generate config files from [https://console.firebase.google.com](https://console.firebase.google.com)
- place `google-services.json` located in _platforms/android_
- place `GoogleServices-info.plist` located in _app/App_Resources/iOS_

> Note: Each removal of `platforms` folder will require to provide your android config json again!

```
tns plugin add nativescript-plugin-firebase
```

```
tns build android
```

- init firebase 
```
firebase.init({
  // Optionally pass in properties for database, authentication and cloud messaging,
  // see their respective docs.
  persist: true
}).then(
  (instance) => {
    console.log("firebase.init done");
  },
  (error) => {
    console.log("firebase.init error: " + error);
  }
);
```

- use the link below for details about how to set, push, query from your DB
[https://github.com/EddyVerbruggen/nativescript-plugin-firebase/blob/master/docs/DATABASE.md](https://github.com/EddyVerbruggen/nativescript-plugin-firebase/blob/master/docs/DATABASE.md)