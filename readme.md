<p align="center">
  <h3 align="center">NTA Call</h3>

<p align="center">
  <img src="https://img.shields.io/static/v1?label=Lincense&message=MIT&color=0000ff " alt="License" />
</p>

<p align="center">
    This app was developed to NTA test job.
    <br />
    <br />
  </p>
</p>

<p align="center">
  <img src="https://user-images.githubusercontent.com/49373874/141870783-fa155b87-f77e-4dfb-9440-81ede0eae10b.png" alt="Logo" />
  
</p>

<!-- TABLE OF CONTENTS -->
## 🗂 Table of Contents

* [About the Project](#book-about-the-project)
  * [Technologies](#computer-technologies)
  * [Layout](#art-layout)
* [Installation](#bricks-installation)
  * [Requirements](#construction-requirements)
  * [Back-end](#file_cabinet-back-end)
    * [Installing Dependencies](#construction-installing-dependencies)
    * [Running](#arrow_forward-running)
  * [Mobile](#lipstick-mobile)
    * [Installing Dependencies](#construction-installing-dependencies)
    * [Running](#arrow_forward-running)
* [License](#page_facing_up-license)

## :book: About The Project


It was proposed to create a video calling application using react native and WebRTC

### :computer: Technologies

* [Javascript](https://www.javascript.com/)
* [Node.js](https://nodejs.org/en/)
* [React Native](https://reactnative.dev/)
* [WebRTC](https://github.com/react-native-webrtc/react-native-webrtc)
* [WebSocket](http://www.websocket.org/)

### :art: Layout

You can access the project's layout in link below:

* [Layout](https://www.figma.com/file/KsrPCJWfpTuworLjgMxijT/NTA-Call?node-id=0%3A1)


🚨 You need have a [Figma](https://www.figma.com) account to acess the layout.

### :construction: Requirements
- Any Operating System having [react-native-cli](https://reactnative.dev/docs/environment-setup) installed.
- To make build your computer should have Android studio installed for android or Xcode for ios.

## :bricks: Installation

This project use [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/), you will need them to build its dependencies.


Clone this project repository:
```bash

$ git clone https://github.com/pierguinzani/nta-call.git

# Enter in `nta-call` folder:

$ cd nta-call
```

🚨 If you don't have git in your machine, you can install it [here](https://git-scm.com/downloads).

## :file_cabinet: Back-end

### :construction: Installing Dependencies

Inside server folder, install dependencies with following comand:

```bash
$ cd server

$ yarn install
```


### :arrow_forward: Running

Run following command to start back-end:

```bash
$ yarn start
```

The Application will be avaible on `wss://localhost:8080/`. 

🚨 If you prefer to run the api with Docker, use `docker-compose up -d`. 
 <br />
🚨 To simplify the test the api is hosted at `wss://api-nta.herokuapp.com`.
## :lipstick: Mobile


### :construction: Installing Dependencies

Inside mobile folder, install dependencies with following comand:

```bash
$ cd mobile

$ yarn install
```


### :arrow_forward: Running

Run following command to start mobile app:

```bash
# Run the app (Android)
$ react-native run-android

or

# Run the app (iOS)
$ react-native run-ios
```

🚨 to simplify the test, the apk for Android was generated and is located at nta-call/mobile/android/app/build/outputs/apk/release/app_release.apk
 <br />
🚨 In order not to increase the complexity of the code, some users were previously added in a mock api. To test the application, log in as one of the following users:
- Carlo
- Sarah
- Tay
- Lya
- Doug

### :page_facing_up: License

This project uses [MIT](https://github.com/pierguinzani/nta-call/blob/main/LICENSE) lincense.


<p align="center">Developed with 💜 by Pier Guinzani</p>
