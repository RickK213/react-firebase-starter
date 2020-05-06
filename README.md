[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://opensource.org/licenses/MIT)
[![GitHub issues](https://img.shields.io/github/issues/RickK213/react-firebase-starter.svg)](https://github.com/RickK213/react-firebase-starter/issues)
[![GitHub stars](https://img.shields.io/github/stars/RickK213/react-firebase-starter.svg)](https://github.com/RickK213/react-firebase-starter/stargazers)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

# ⚛️🔥 React Firebase Starter
An application using [React](https://reactjs.org/), [Firebase](https://firebase.google.com/) and [Redux](https://redux.js.org/) designed to be used as a starting point for web applications.

## Table of Contents
1. [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installing](#installing)
2. [Firebase](#firebase)
  * [Configuration](#configuration)
  * [Products Supported](#products-supported)
  * [Screens](#screens)
3. [Developing](#developing)
  * [Webpack Dev Server](#webpack-dev-server)
  * [ESLint and Prettier.io](#eslint-and-prettierio)
4. [Deploying](#deploying)
5. [Testing](#testing)
6. [Scripts](#scripts)
7. [Authors](#authors)

<a name="getting-started"></a>

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

<a name="prerequisites"></a>

### Prerequisites

#### Node.js & Node Package Manager
You'll need to download and install Node.js version 6 or higher and Node Package Manager for installing dependencies. Node Package Manager is installed when installing Node.js. Download the latest version of Node.js [here](https://nodejs.org/en/download/).

<a name="installing"></a>

### Installing
You'll need to clone this repository to your working directory on your local machine, then install the project dependencies using **Node Package Manager** through the command line.

First, navigate to your working directory:
```
cd path/to/your/working/directory
```

Clone this repository to your working directory:
First clone the repository:
```
git clone https://github.com/RickK213/react-firebase-starter
```

After cloning is complete, navigate inside the newly cloned repository:
```
cd react-firebase-starter
```

Finally, run `npm install` to install all project dependencies:
```
npm install
```

<a name="firebase"></a>

## Firebase

<a name="configuration"></a>

### Configuration
To add your Firebase configuration to the application, follow these steps:
1. [Create a Firebase project](https://firebase.google.com/docs/web/setup) and find/copy your [Firebase config object](https://firebase.google.com/docs/web/setup#config-object)
2. Re-name `./app-config/firebase-config.sample.js` to `firebase-config.private.js` (Note that `.gitignore` is already configure to prevent this file from being added to the repository as it contains sensitive information).
3. Paste the contents for your Firebase config object into the re-named file
4. Change the "default" project in `./firebaserc` to your Firebase project id
5. Update the constant `ADMIN_EMAIL_ADDRESS` in `./functions/on-auth-user-create/on-auth-user-create.js` to your preferred email address. Creating an account with this email address will give that user the `ADMIN` role.

<a name="products-supported"></a>

### Products Supported
This project implements and utilizes the following Firebase products:
* [Authentication](https://firebase.google.com/docs/auth)
* [Cloud Firestore](https://firebase.google.com/docs/firestore)
* [Hosting](https://firebase.google.com/docs/hosting)
* [Cloud Functions](https://firebase.google.com/docs/functions)

<a name="screens"></a>

### Screens
The following screens for authenticating the user and displaying sample data are included. However, these screens and their child components are meant to be re-styled, replaced or removed. No CSS/SASS/LESS files are included in this project and webpack will require configuration to bundle stylesheets.
| Screen          | Description                                                            | Route              |
|-----------------|------------------------------------------------------------------------|--------------------|
| Sign Up         | Users can create an account                                            | `/sign-up`         |
| Sign In         | Users can sign in to their account                                     | `/sign-in`         |
| Forgot Password | Users can reset their password                                         | `/password-forget` |
| Home            | Authenticated users can create, edit & delete To Dos                   | `/`                |
| Account         | Authenticated users can view account details and change their password | `/account`         |
| Admin           | `ADMIN` users can view the list of users | `/admin`                    | `/admin`           |
| User Detail     | `ADMIN` users can view user details and send a password reset email    | `/admin/{userId}`  |

<a name="developing"></a>

## Developing

<a name="webpack-dev-server"></a>

### Webpack Dev Server
During development, the application can be run in a web browser using [Webpack Dev Server](https://webpack.js.org/configuration/dev-server/). To start the application in a web browser, navigate to the root of the project directory in the command line and run `npm run start`. This command will print out a URL which can be opened in a web browser.

First, navigate to the root of the project:
```
cd path/to/your/working/directory/react-firebase-starter
```
Then start the application:
```
npm run start
```
After Webpack Dev Server has compiled the development bundle, it will print out something similar to following:
```
ℹ ｢wds｣: Project is running at http://localhost:3000/
ℹ ｢wds｣: webpack output is served from /
ℹ ｢wds｣: 404s will fallback to /index.html
ℹ ｢wdm｣:
ℹ ｢wdm｣: Compiled successfully.
```
Open the URL [http://localhost:3000/](http://localhost:3000/) in your web browser.

#### Hot Reloading
This project is equipped with [Webpack Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/). This means that while Webpack Dev Server is running the application, you can make changes to the files and they will automatically update in the web browser. Occasionally, the web browser may need a manual refresh if you're changes affect application state or changes outside of the React life-cycle.

<a name="eslint-and-prettierio"></a>

### ESLint and Prettier.io
This project is equipped with [ESLint](https://eslint.org/) and [Prettier.io](https://prettier.io/) to ensure a homogeneous code-style and JavaScript syntactical error prevention.

During development, you can run `npm run eslint:fix` in the root of the project to automatically fix any fixable [ESLint errors/warnings](.eslintrc), and format your JavaScript to match the [Prettier standards](.prettierrc).

#### Pre-Commit Hooks
This project is equipped with [Git Pre-Commit Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) to help ensure successful builds. These "hooks" are a set of scripts that will run before allowing a developer to commit to the project. If any of these scripts fail the commit will cancel.

Before allowing a successful commit Git will run the following scripts:
```
npm run eslint
npm run test:changed
```
It's recommended that developers run `npm run eslint:fix` often during development to prevent any failures from code-style or JavaScript syntactical errors.

<a name="deploying"></a>

## Deploying
To deploy the application to Firebase hosting and deploy Firebase Cloud Functions, follow these steps:
1. [Install the Firebase CLI](https://firebase.google.com/docs/hosting/quickstart#install-cli)
2. Ensure you are logged in to your Firebase account by running `firebase login`
6. [Activate hosting](https://firebase.google.com/docs/hosting/quickstart) in your Firebase project
4. Run this script: `npm run deploy` This will clean the `./dist` folder and re-build the application.

Note that you can deploy the application and Firebase Cloud Functions independently by running Firebase CLI commands directly and including the `--only` flag. For example, to deploy functions only, run `firebase deploy --only functions`

<a name="testing"></a>

## Testing
This project is equipped with [Jest](https://jestjs.io/), and [Enzyme](https://github.com/airbnb/enzyme) to assist in testing JavaScript files. Each JavaScript file in the application should be in it's own folder with a sibling `.test.js` test file. The test file should test as close to 100% of it's sibling.

To check the test coverage of the application run `npm run test:coverage`. This script will print out a code coverage report in the command line and generate an LCOV code coverage report in the project's `./coverage/` folder.

<a name="scripts"></a>

## Scripts
### `build`
This command runs `webpack` in "production" mode. It uses the `src/index.js` file as it's entry point, and generates a JavaScript `bundle.js` and `index.html` file in `dist/`.

### `clean`
This command deletes the `dist/` directory.

### `deploy`
This command runs `clean`, `build` and `firebase deploy` to deploy the application and Cloud Functions to Firebase.

### `eslint`
This command runs `eslint src/`. It prints eslint warnings and errors in the command line.

### `eslint:fix`
This command runs `eslint --fix src/`. It attempts to fix any eslint warnings/errors then prints the remaining warnings and errors in the command line.

#### `start`
This command runs `webpack-dev-server` in "development" mode on the documentation. Hot reloading is enabled. Once running, you can access the documentation running locally at [localhost:3000/](http://localhost:3000/).

### `test`
This command runs `jest`. It prints test successes/failures in the command line.

### `test:changed`
This command runs `jest -o` on the JavaScript files that have changed or are uncommitted. It prints test successes/failures in the command line.

### `test:coverage`
This command runs `jest --coverage`. It prints the test successes/failures in the command line and creates an .html test coverage report in `./coverage/lcov-report/index.html`.

<a name="authors"></a>

## Authors
* **Rick Kippert** - *Initial work*

See also the list of [contributors](https://github.com/RickK213/react-firebase-starter/contributors) who participated in this project.