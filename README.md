# Webbee-hackathon

- React Native (v0.70 + )
- Redux Toolkit + Persist Store + Saga 
- Typescript + ES6 + functional components
- ...

## Feature: 
- Pick a field in machine to use as title: Only get text field. 

### Environment Setup

The code is built using React-Native and running code locally requires a Mac or Linux OS.

-   Install [Node.js](https://nodejs.org) **version 14 (latest stable) and yarn@1 (latest)**

    -   If you are using [nvm](https://github.com/creationix/nvm#installation) (recommended) running `nvm use` will automatically choose the right node version for you.

-   Install yarn
-   Install the shared [React Native dependencies](https://reactnative.dev/docs/environment-setup#installing-dependencies) (`React Native CLI`, _not_ `Expo CLI`)

-   Install [cocoapods](https://guides.cocoapods.org/using/getting-started.html) by running:

```bash
sudo gem install cocoapods
```

### Building Locally

-   Clone this repo:
```bash
git clone ...
cd webee-hackathon
```

-   Install the app:
```
yarn install
cd ios && pod install && cd .. # install pods for iOS
```

-   Then, run:

#### Android
```bash
yarn android
```

#### iOS
```bash
yarn ios
```

