# redux-toolkit-dynamic-import

Bindings for Redux Toolkit and React/Next JS

Step by Step article on dynamic import (https://medium.com/@ajinkyabhise012/automation-in-redux-toolkit-1cd8aff7ed46)

# 🚀 Installation 🚀

Installation: `yarn i redux-toolkit-dynamic-import` or `npm i redux-toolkit-dynamic-import`

If you want to use dynamic import,you have also installed: `npm install @reduxjs/toolkit react-redux axios`

# 👩‍🎓 Why 👩‍🎓

why use redux-toolkit-dynamic-import:

Automatic Reducer Discovery: Saves manual configuration and maintenance effort.
Seamless Redux Toolkit Integration: Leverages the familiar APIs and conventions of Redux Toolkit.
Enhanced Developer Experience: Offers a more streamlined and enjoyable development process.

Benefits:

Benefits of Using redux-toolkit-dynamic-import:

Improved Performance: By loading reducers only when needed, initial page load times and overall application responsiveness can be significantly boosted.
Reduced Bundle Size: By avoiding including unused reducers in the initial bundle, your application's overall size is reduced, leading to faster downloads and better performance on slower networks.
Better Code Organization: Separate reducer files promote modularity and maintainability, making your Redux codebase easier to manage and reason about.
Enhanced Developer Experience: The automatic reducer discovery and lazy loading mechanism save you time and effort, streamlining the Redux setup process.

# 👟 Overview & getting started 👟


The following are steps to connect the store and application from the (FrontEnd & BackEnd) as shown below:

Step 1 : 

install this cmd: `npm i redux-toolkit-dynamic-import`
& 
install this cmd: `npm install @reduxjs/toolkit react-redux axios`
 
Step 2 :

create a file `dyimport.js` and add this code :

`dyimport.js` (shortened):

```
const yourPackage = require('dynamic-import-redux-toolkit');

const moduleNames = []; add here all model names in lowercase eg : ['product','order','bill']

yourPackage.generateStoreFiles(moduleNames);

```

step 3 : 

go into the package.json file and add this code :

`"config-toolkit": "node dyimport.js"`

example code : 

```
"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "config-toolkit": "node dyimport.js"
  }
```

step 4 :
The next step is to run this cmd for dynamically importing store and models API:

open the terminal and run : 

`npm run config-toolkit`

step 5 : 

Integrate the store with front-end using the Provider from `react-redux`

In Next Js :

Inside the `app/layout.js` or `pages/_app.js` folder

```
"use client";
import "./globals.css";
import { Provider } from 'react-redux';
import store from '../store';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          {children}
        </Provider></body>
    </html>
  );
}
```

In React Js : 

Inside the `src/index.js`

```
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store"

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById("root"))

```

step 6 :
Add the backend application endpoint to the HTTP server file

`httpServer.js`

update the URL here `httpServer.js` is located in the `store` folder on root location

```
// Initialize Axios instance with a URL
    const http = axios.create({
      baseURL: 'http://example.com', // Replace with your actual base URL
    });
```

FINALLY RUN YOU PROJECT AND ENJOY THE DYNAMIC CREATION OF REDUX TOOLKIT STORE.

```npm run dev```

for how to integrate api from pages please visit my blogs (https://medium.com/@ajinkyabhise012/automation-in-redux-toolkit-1cd8aff7ed46)
