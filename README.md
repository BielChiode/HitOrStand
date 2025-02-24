# Hit or Stand Game

## Description

This is a blackjack (21) game application, developed with React Native and Expo. The goal of the game is to add cards for the player and the dealer, accumulating points according to the game rules.

## Prerequisites

Before getting started, you need to have the following installed on your computer:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

## Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/your-user/your-repository.git
   cd your-repository
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Run the project**
   ```sh
   expo start
   ```
4. **Open the app on a device or emulator**

- On a physical device: Download the Expo Go app from the App Store or Google Play and scan the QR code displayed in the browser.
- On an emulator: Follow the terminal instructions to start the Android/iOS emulator.

## Available Scripts

- **`npm start`**: Starts the Expo development server.
- **`npm run android`**: Runs the app on an Android emulator.
- **`npm run ios`**: Runs the app on an iOS emulator (macOS required).
- **`npm test`**: Runs the application tests.
- **`npm run coverage`**: Runs the tests and displays test coverage.
- **`npm run test_watch`**: Runs the tests in watch mode.

## Project Structure

```
├── assets         # Images and other static resources  
├── components     # Reusable React components  
├── screens        # Application screens  
├── api            # Services and hooks for API calls  
├── utils          # Utility functions  
├── App.js         # Main application component  
├── app.json       # Expo configuration  
├── package.json   # Dependencies and npm scripts  
└── README.md      # Project documentation  
```

## Tests

Tests are written using the @testing-library/react-native library.  
To run the tests, use the following command:

```sh
npm test
```
