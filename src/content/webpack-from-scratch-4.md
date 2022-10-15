---
date: 2016-01-29T22:40:32.169Z
tags: webpack, javascript, react, live reload
title: Building a seed project with Webpack, ReactJS, and ES6  Part 4 Live Reload
type: tutorial
---

[Completed Repo: Part 3](https://github.com/jordanpapaleo/tutorial-seedProject/tree/part-four)

In this post we will be taking the code from our the last part and turn that into a development server.

## Main Topics
[Webpack](https://webpack.github.io/docs/) | [ES6](https://github.com/lukehoban/es6features) | [ReactJS](https://facebook.github.io/react/)

## Supporting Topics
[NPM](https://www.npmjs.com/)

## Dev Environment
So a developer environment can be a personal thing.  But I think most of us would agree that we want something that watches our project for changes then live updates our code.  We do not want errors in the code to terminate the process.  Let's start with installing our [server](https://github.com/webpack/webpack-dev-server) package with npm.

    seed-project $ npm install --save-dev webpack-dev-server

Next we are going to create a npm script in our `package.json` file for running our dev environment.  Here is the current script after dev has been added.

    "scripts": {
      "test": "standard ./**/*.js, ./**/*.jsx, *.js | standard-reporter --stylish",
      "build-dist": "rm -rf ./dist && webpack --config webpack.config.js --bail -p",
      "dist": "npm test && npm run build-dist",
      "dev": "webpack-dev-server"
    }

Go ahead and run the script now in your terminal.

    seed-project $ npm run dev

So when we run this our, terminal will get real busy.  It is going to process all of our assets, build the entire site, and print everything to the screen.  The bigger your project the longer it will take for the initial build to happen.  I have some pretty large projects using this with close to a thousand modules being processed.  That takes about 10 seconds to load.  Now take a look at your projects folders.  You  may have a `dist` directory from previously running our build process.  If you do, press `ctrl + c` in your terminal to stop the dev server, delete the dist directory `rm -rf dist`, then restart your server.  Before now we were serving our built directory but with our new dev server we are serving the project from a build that exists in our computers memory.  It is the same build but it never creates physical copies of file to serve.  Go ahead an make a change to the heading text in `app/components/main/Main.js`.  Watch you terminal when you save it.  It will detect the change and rebuild that module.  If you refresh the browser you will see the change.  Problem is we still have to refresh our page and that just gets tedious after about 5 minutes.

We need to go back to our `package.json` and add a flag to our dev script.

    "dev": "webpack-dev-server --inline"

We need to make another change to our webpack config.  We are going to add a property to our output for a public path.

    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist'),
      publicPath: 'http://localhost:8080/'
    }

Restart your server and change the heading text again.  The browser should refresh and render your change.  The [--inline](https://webpack.github.io/docs/webpack-dev-server.html#inline-mode) flag tells webpack that we want the server to run with auto refresh using inline mode instead of iframe mode.

Technically we could stop here but let's make this even cooler. To be continued...

