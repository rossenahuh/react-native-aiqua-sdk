
# react-native-aiqua-sdk

## IMPORTANT
`DO NOT` use Release Candidate Version (ex: `1.3.1-rc-1`) in your production app.

### For latest guides, please follow our document https://docs.aiqua.appier.com/docs/installing-the-sdk-via-react-native

## Getting started

`$ npm install react-native-aiqua-sdk --save`


## Mostly automatic installation

`$ react-native link react-native-aiqua-sdk`

Also Link `react-native-webview`
`$ react-native link react-native-webview`


## Manual installation

### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-aiqua-sdk` and add `RNAiquaSdk.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNAiquaSdk.a` and `libRNCWebView.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNAiquaSdkPackage;` to the imports at the top of the file
  - Add `new RNAiquaSdkPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
    ```
    include ':react-native-webview'
    project(':react-native-webview').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-webview/android')
    include ':react-native-aiqua-sdk'
    project(':react-native-aiqua-sdk').projectDir = new File(rootProject.projectDir,    '../node_modules/react-native-aiqua-sdk/android')
    ```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
    ```
      implementation project(':react-native-webview')
      implementation project(':react-native-aiqua-sdk')
    ```

## Android Setup

### Add firebase to your Android subproject.
Please follow google's official document https://firebase.google.com/docs/android/setup


# Usage
```javascript
import RNAiqua, { RNAiquaWebView } from 'react-native-aiqua-sdk';
```

## Setting up the sdk
### Sdk should be configured before using any methods. Initialise sdk on your route js file.

* appId: your app id
* senderId: your own fcm sender id (Android)
* appGroup: your app groud (iOS)
* isDev: `true` for development, `false` for production (iOS)

```
RNAiqua.configure({
  appId: '<your appId>', 
  senderId: '<fcm sender id>', // android sender id - optional
  appGroup: '<iOS App Group>', // ios app group - optional
  isDev: true // ios dev or prod - default `false` - optional
})
```

#### To Use default sender id and skip app group
* pass null or skip the key

```
RNAiqua.configure({
  appId: '<your appId>',
  isDev: true
})
```

### Enable App Groups in xcode - check documentation

https://docs.aiqua.appier.com/docs/enabling-capabilities

NOTE: This sdk initialise can also be done inside the app delegate inside `didFinishLaunchingWithOptions`
```
QGSdk *qgsdk = [QGSdk getSharedInstance];
  #ifdef DEBUG
    [qgsdk onStart:@"your aiqua appid" withAppGroup:@"group.com.company.product.notification" setDevProfile:true];
  #else
    [qgsdk onStart:@"your aiqua appid" withAppGroup:@"group.com.company.product.notification" setDevProfile:false];
  #endif
```

### Set Token - iOS APNs Token

APNs token is required by the AIQUA system

## Please follow native documentation to enable push

Enable push notification inside capabilities in your xcode project - https://docs.aiqua.appier.com/docs/enabling-capabilities

https://docs.aiqua.appier.com/docs/registering-push-notifications-for-the-aiqua-ios-sdk

Inside AppDelegate.m, add following code and implement `UNUserNotificationCenterDelegate` methods as mentioned below

```
#import <UserNotifications/UserNotifications.h>
#import "QGSdk.h"

@interface AppDelegate() <UNUserNotificationCenterDelegate>
@end
```

For Push Prompt, add following code inside `didFinishLaunchingWithOptions`

```
if(@available(iOS 10.0, *)) {
    UNAuthorizationOptions options = (UNAuthorizationOptions) (UNAuthorizationOptionAlert | UNAuthorizationOptionBadge | UNAuthorizationOptionSound | UNAuthorizationOptionCarPlay);

    UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
    center.delegate = self;

    [center requestAuthorizationWithOptions:options completionHandler:^(BOOL granted, NSError *error){
      NSLog(@"GRANTED: %i, Error: %@", granted, error);
    }];
  } else {
    // Fallback on earlier versions - iOS 8 & 9
    UIUserNotificationType types = UIUserNotificationTypeAlert | UIUserNotificationTypeSound | UIUserNotificationTypeBadge;
    UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:types categories:nil];
    [[UIApplication sharedApplication] registerUserNotificationSettings:settings];
  }
```

NOTE: Send us the apns token from App Delegate (Preffered)

import aiqua sdk in your App Delegate `#import "QGsdk.h"`
```
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  NSLog(@"My token is: %@", deviceToken);
  [[QGSdk getSharedInstance] setToken:deviceToken];
}
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
  NSLog(@"Failed to get token, error: %@", error.localizedDescription);
}
```

## IMPORTANT
More `UNNotificationCenterDelegate` methods should be handled inside App Delegate and methods should be implemented.

https://docs.aiqua.appier.com/docs/notification-center-delegates-and-handling-push-notifications

1. On notification receive
```
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(nonnull NSDictionary *)userInfo fetchCompletionHandler:(nonnull void(^)(UIBackgroundFetchResult))completionHandler
{
  [[QGSdk getSharedInstance] application:application didReceiveRemoteNotification:userInfo];
  completionHandler(UIBackgroundFetchResultNoData);
}
```

2. On notification receive in foreground
```
- (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void(^)(UNNotificationPresentationOptions options))completionHandler API_AVAILABLE(ios(10.0)){
  [[QGSdk getSharedInstance] userNotificationCenter:center willPresentNotification:notification];
  UNNotificationPresentationOptions option = UNNotificationPresentationOptionBadge | UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert;
  completionHandler(option);
}
```

3. On notification click response
```
- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void(^)(void))completionHandler API_AVAILABLE(ios(10.0)){
  [[QGSdk getSharedInstance] userNotificationCenter:center didReceiveNotificationResponse:response];
  completionHandler();
}
```

### Rich Push (settings needed only in iOS)
Please follow native documentation to add `service and content extension`
This section need to create additional target inside xcode project.

https://docs.aiqua.appier.com/docs/rich-push-notification-using-extensions-for-ios-10-and-above

### To send token from react native, `setToken` can be used
`RNAiqua.setToken(token)`


## Logging Events

* eventName: string -- event name
* eventInfo: string -- dictionary of all the parameters for the event
* valueToSum: number -- monetary value associated to the event
* valueToSumCurrency: string -- currency code of the value to sum

1. `RNAiqua.logEvent(eventName)`
1. `RNAiqua.logEvent(eventName, parameters)`
1. `RNAiqua.logEvent(eventName, valueToSum)`
1. `RNAiqua.logEvent(eventName, valueToSum, currency)`
1. `RNAiqua.logEvent(eventName, parameters, valueToSum)`
1. `RNAiqua.logEvent(eventName, parameters, valueToSum, currency)`


## Setting profile parameters
1. `RNAiqua.setUserId('USER_ID')`
1. `RNAiqua.setName('NAME')`
1. `RNAiqua.setFirstName('FIRST_NAME')`
1. `RNAiqua.setLastName('LAST_NAME')`
1. `RNAiqua.setCity('CITY')`
1. `RNAiqua.setEmail('user@mail.xxx')`
1. `RNAiqua.setDayOfBirth(1)`
1. `RNAiqua.setMonthOfBirth(7)`
1. `RNAiqua.setYearOfBirth(1997)`
1. `RNAiqua.setPhoneNumber('0912345678')` -- Android Only
1. `RNAiqua.setCustomKey('KEY_STR', 'strval')`
1. `RNAiqua.setCustomKey('KEY_BOOL', true)`
1. `RNAiqua.setCustomKey('KEY_OBJ', {'k1': 'v1'})`


## WebView Support
Web sites integrated with AIQUA Web can be used in react native webview. 
`RNAiquaWebView` is a React class using 'react-native-webview' as dependency. It inherits all the props and methods of the library 
as mentioned in the doc `https://github.com/react-native-community/react-native-webview/blob/master/docs/Reference.md#javascriptenabled`. 
For iOS, webkit is set to true and can not changed.

### Usage
```
// import RNAiquaWebView 
import { RNAiquaWebView } from 'react-native-aiqua-sdk';

// render webview
<RNAiquaWebView source={{uri: 'https://www.google.com/'}}/>
```


## Other functions

### Hides the In-App Campaigns
`RNAiqua.disableInAppCampaigns(true)`

### Uploads queued data to the QGraph server.
By default, queued data is flushed to the QGraph servers every 15 seconds (the default for flushInterval). You only need to call this method manually if you want to force a flush at a particular moment.
`RNAiqua.flush()`

### Sets the View Through Attribution Window for event attribution. This method should be used to set the View through attribution window. View through attribution works only for InApp notifications. Default to 1 hr (3600 secs). eg: for view through attribution window to be 2 hrs, pass the value: 7200. Pass seconds as '0' to disable click attribution
`RNAiqua.setAttributionWindow(7200)`


### This method should be used to set the click through attribution window. Click through works for push notification (sent by QGraph) clicks and InApp Notification clicks. Default to 24 hrs (86400 secs). eg: for click attribution window to be 12 hrs, pass the value: 43200. Pass seconds as '0' to disable click attribution
`RNAiqua.setClickAttributionWindow(43200)`


## Methods available only in ANDROID

### Apart from default user profile parameters, you can log the UTM source through which the user installed the app

1. `RNAiqua.setUtmSource('UTMSOURCE')`
1. `RNAiqua.setUtmMedium('UTMMEDIUM')`
1. `RNAiqua.setUtmTerm('UTMTERM')`
1. `RNAiqua.setUtmContent('UTMCONTENT')`
1. `RNAiqua.setUtmCampaign('UTMCAMPAIGN')`

### Enables Google Analytics tracking and set the GAID to pass data.
`RNAiqua.enableGATrackingWithGAID('GAID')`

### Gets the GAID set by the developer.
`RNAiqua.getTrackerId( ret => { //ret is the tracker id } )`

### Disables Google Analytics tracking.
`RNAiqua.disableGATracking()`

### Checks if the entered message is a Aiqua Message.
`RNAiqua.isQGMessage( 'SOME_MESSAGE', ret => { //ret is the result--true or false } )`

### Gets the stored notifications.
`RNAiqua.getStoredNotifications( ret => { //ret is the stored notifications } )`

### Deletes the stored notifications.
`RNAiqua.deleteStoredNotifications()`

### Sets the max amount to store notifications.
`RNAiqua.setMaxNumStoredNotifications(13)`

### Enables push booster.
`RNAiqua.enablePushBooster()`

### Disables location tracking.
`RNAiqua.disableLocationTracking()`
