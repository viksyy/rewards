# Rewards

## Challenge
Setup a basic React Native app on your system: https://reactnative.dev/

* Make sure to be able to run the app either on a simulator or on a real device (either ios or android) 
* A Navigation System (Tabbar, navigation bar) is not required
* The app should simply show one screen when being started
### Requirements
* Now extend the screen to fetch data, and visualise that data in a list. The data can be fetched from URL, which will return a list of loyalty rewards. When it comes to the UI, feel free to make a suggestion. Rewards usually have a name, needed points and optionally a list of pictures.

* Now add a Call to action (Button, Link, etc.) to each list item, so that it’s possible to collect loyalty rewards. When this CTA is clicked it should dispatch a redux action “COLLECT_REWARD” and send the reward data as a payload. Also add a redux reducer that will append the collected reward to a list of collected rewards.

* Finally, create a very simple visualisation for collected rewards. This can be done on the same screen as the list view. No need for a fanzy UI, it should just demonstrate that rewards are added when the redux action is dispatched.


## Preview

### Android

<p float="left">
    <img src="https://github.com/viktorspasevski/fleet-management/blob/main/git-images/android1.png" width="270" alt="Screenshot 1">
    <img src="https://github.com/viktorspasevski/fleet-management/blob/main/git-images/android2.png" width="270" alt="Screenshot 2">
    <img src="https://github.com/viktorspasevski/fleet-management/blob/main/git-images/android3.png" width="270" alt="Screenshot 3">
    <img src="https://github.com/viktorspasevski/fleet-management/blob/main/git-images/android4.png" width="270" alt="Screenshot 4">
</p>


### iOS

<p float="left">
    <img src="https://github.com/viktorspasevski/fleet-management/blob/main/git-images/ios1.png" width="270" alt="Screenshot ios 1">
    <img src="https://github.com/viktorspasevski/fleet-management/blob/main/git-images/ios2.png" width="270" alt="Screenshot ios 2">
    <img src="https://github.com/viktorspasevski/fleet-management/blob/main/git-images/ios3.png" width="270" alt="Screenshot ios 3">
    <img src="https://github.com/viktorspasevski/fleet-management/blob/main/git-images/ios4.png" width="270" alt="Screenshot ios 4">
</p>

### Animated GIF


<p float="left">
    <img src="https://github.com/viktorspasevski/fleet-management/blob/main/git-images/ios-video.gif" width="270" alt="GIF iOS">
</p>

## Main technologies used

- [React Native](https://github.com/facebook/react-native)

> A framework for building native apps with React.

- [Redux](http://redux.js.org/)

> Redux is a predictable state container for JavaScript apps.

## Running the project

- Clone this project
```
git clone < project-url.git >
```

- [Install NodeJS](https://nodejs.org/en/) on your computer.

- [Install yarn](https://yarnpkg.com/en/docs/install) on your computer
> Yarn is a dependency manager built by facebook and google. It is a more efficient and reliable (thanks to yarn.lock) alternative of npm.

- Launch ``` yarn ``` command in a terminal opened in the project folder.
> This command will look into the *package.json* file and install all the dependencies listed here.

- Install react-native-cli globally on your computer
```
yarn global add react-native-cli
```
### Android steps

- Launch a virtual android device [(through *Android Studio* for instance)](https://developer.android.com/studio/run/managing-avds.html#viewing)

> If you have never installed any android virtual device, [follow those instructions](https://developer.android.com/studio/run/managing-avds.html#createavd)

- Then, run the project in executing on your project folder:

```
react-native run-android
```

### iOS steps

- Run the command to install the Pods inside your ios folder
```
cd ios && pod install && cd ..
```

- Run the command on your project folder:
```
react-native run-ios
```

`Hint: If there is any errors in build terminal please check the signing certifcates in Xcode -> Signin Certificates`


## Troubleshooting

**Note:** Each time you pull commits from others, run the **yarn** command to install dependencies that may have been introduced.

### react-native is not recognized as an internal or external command
- If your terminal is telling you react-native is not known, try to install it globally with npm: ```npm install -g react-native-cli``` and re-run the above command.

### 'adb' is not recognized as an internal or external command

If you have a build error with this message on Windows, it means that you must add the Android sdk platform tools to your environment PATH.

[How to add an environment variable on your computer.](https://www.java.com/en/download/help/path.xml)

My value on windows: *```C:\Users\Manuel\AppData\Local\Android\sdk\platform-tools```*

### failed to find target with hash string 'android-23'

React Native needs this to be installed in order to work, and the default target installed by *Android Studio* is the 24th. To solve this issue, open android studio and click on SDK Manager Icon:

![SDK Manager](https://i.snag.gy/bxQd0z.jpg)

Then click on the line with API Level of value 23 and apply.

![Install API 23 Instructions](https://i.snag.gy/LtYAR7.jpg)

### failed to find Build Tools revision *XX.X.X*

It seems you are missing the build tools at specific revision *XX.X.X*, so you need to install them. Go to Android Studio SDK Settings (see images above) and click on the SDK Tools snippet.

Then, click on **Show Package Details** and look for Android SDK Build Tools *XX.X.X*. Then check if it is installed. If not, install it and this issue should be solved then.

![SDK Manager Standalone](https://i.snag.gy/Y3X58Z.jpg)

### Execution failed for task ':app:dexDebug'

Go into the **android** project's folder in your terminal and run

*Windows*
```
gradlew clean
```

*Linux & Mac*
```
./gradlew clean
```

Then delete the build folder, go back to the project's root folder and try again, this error should be solved.

> **Note:** If it doesn't work as expected, try checking you have not forgotten any of the steps above. If not, please **open an issue and describe your problem**.
