# ExpiryInspector

********** For run project***************

Open 'Frontend' folder [cd Frontend]

---------------install react metro [First time runing on local mechine]------------

npm uninstall -g react-native-cli @react-native-community/cli

npm install

---------------if warn pop up [Optional]------------

npm install --save-dev @babel/plugin-transform-class-properties @babel/plugin-transform-nullish-coalescing-operator @babel/plugin-transform-optional-chaining @babel/plugin-transform-object-rest-spread

npm install rimraf@latest glob@latest

npm audit fix

---------------run on android-------------

npm run android

---------------Navigation [already installed]-------------
npm install @react-navigation/native

npm install react-native-screens react-native-safe-area-context

npm install @react-navigation/native-stack

---------------Firebase Authentication-------------

npm install firebase

npm install @react-native-firebase/app @react-native-firebase/auth

---------------Firestore-------------
npm install @react-native-firebase/firestore

npm install @react-native-firebase/app

-----------------text read------------------
npm install react-native-image-picker


npm install @react-native-ml-kit/text-recognition react-native-image-picker

--------------Notification--------------------------
npm install react-native-push-notification

AndroidManifest.xml
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />

<meta-data
    android:name="com.dieam.reactnativepushnotification.notification_channel_name"
    android:value="General Notifications" />
<meta-data
    android:name="com.dieam.reactnativepushnotification.notification_channel_description"
    android:value="Notifications for item updates." />

 
---------------------other--------------------------
npx react-native doctor

-- Writen by Pradeep--
