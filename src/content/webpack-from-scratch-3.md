---
date: 2016-01-02T22:40:32.169Z
tags: webpack, javascript
title: Building a seed project with Webpack, ReactJS, and ES6  Part 3 Adding Loaders
type: tutorial
---

[Completed Repo: Part 3](https://github.com/jordanpapaleo/tutorial-seedProject/tree/part-three)

Welcome back!  Last time we set up a basic webpack config giving us the ability to bundle our repository into a single source of code truth giving us an easy point to deploy from.  we also learned about npm and semantic versioning of packages.  Lastly, we setup up some code standards for linting.  The last two moved kind of slow; think it of the warm up before the show because we are about to really start moving.

In this post we will build out a lot of functionality in our webpack process.  We will transpile ES6 code, incorporate assets, and compile styles.  I will also introduce a paradigm in file structure you may not be familiar with.  I really like it and won't judge you if you don't.

## Main Topics
[Webpack](https://webpack.github.io/docs/) | [ES6](https://github.com/lukehoban/es6features) | [ReactJS](https://facebook.github.io/react/)


## Supporting Topics
[Babel](https://babeljs.io/) | [NPM](https://www.npmjs.com/) | [Linting](http://eslint.org/)  [ES6](https://github.com/lukehoban/es6features) | [ReactJS](https://facebook.github.io/react/) | [Semantic Versioning](https://github.com/npm/node-semver)

## [Webpack Loaders](https://webpack.github.io/docs/loaders.html)
So a webpack loader allows you to preprocess files.  You can do this requiring or importing components.  For example, you can include a style sheet, an image, or other JS files.  The process we are going to do here is going to be very similar for each loader we use.  We will install it with npm then add it to our `webpack.config.js` file.  For clarity in the code examples I am going to only show the code where we are working.  I will refer to the places we will be working by their commented section.

    // webpack.config.js
    var path = require('path')
    var HtmlWebpackPlugin = require('html-webpack-plugin')
    // Include Section

    module.exports = {
      entry: './app/index.js',
      output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
      },
      module: {
        preLoaders: [],
        loaders: [
          // Loader Config Section
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          title: 'Seed Project',
          filename: 'index.html',
          template: 'index.tmpl.html',
          inject: 'body',
          hash: true
        })
      ]
    }

### JS Loader

[babel-loader](https://github.com/babel/babel-loader)

Let's start with our JavaScript loading as there is really not an app without the JS.  We will be using babel to handle our JS loading.  We use babel because we are using ES6 and need to transpile our code.  Run the following command to install our loader and the loader dependencies.  You probably noticed that this install command looks a little different than previous ones.  With npm we can install multiple packages in one command.  We are installing babel and its' two dependencies.

    seed-project $ npm install babel-loader babel-core babel-preset-es2015 --save-dev

Take a look at your `package.json` file and notice all the additions to our project.  Next we are going to add a loader configuration to our `webpack.config.js`.  The loader configuration is an object that has properties test (regex test on a file name), exclude (a pipe delimited list of excluded directories), loader (the loader to apply to the file type), and an optional query.

    {
      test: /\.(jsx|js)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }

Go ahead and open `app/index.js` and update it to use a [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) data type.

    console.log('this is my app')
    const blar = 'plop'

Run our build process `npm run build-dist` and then look at the output in `dist/bundle.js`.  You should be able to find the following code `var blar = 'plop';`  This means our ES6 code was successfully transpiled.  So real quick we are going to create a little more structure to our app for our upcoming examples.  We are going to start our ReactJS app structure by creating a components directory (more on this later) and then adding a test component.

    seed-project $ mkdir app/components
    seed-project $ mkdir app/components/test
    seed-project $ touch app/components/test/index.js

Change `app/components/test/index.js` to make a simple get/set ES6 object.  Also export that object so we can use it in `app/index.js`.  It should look like this:

    export default {
      _wiz: 'bang',
      set wiz (val) {
        this._wiz = val
      },
      get wiz () {
        return this._wiz
      }
    }

Then update `app/index.js` to import the test component:

    import test from './components/test'
    console.log('test', test)
    const blar = 'plop'

Run the npm build process again and go ahead and serve the `dist` directory.  Side note: for all my simple web server needs I use the [serve](https://www.npmjs.com/package/serve) module.  Once installed its as easy as running `$ serve` in any directory to have it running at `http://localhost:3000`.  So once its running, open your browser console and notice our test component being logged out.

To make our folder structure a little more flexible we are going to add a properties to our webpack config: [context](https://webpack.github.io/docs/configuration.html#context) and [resolve](https://webpack.github.io/docs/configuration.html#resolve).  Long story short, this allows us to use an import syntax that does not require absolute paths.  So we can restructure stuff as needed with minimal damage.  Just so everyone is on the same page I am going to show the entire config here:

    var path = require('path')
    var HtmlWebpackPlugin = require('html-webpack-plugin')

    module.exports = {
      context: path.join(__dirname, 'app'),
      entry: './index.js',
      output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
      },
      resolve: {
        root: [
          path.join(__dirname, 'app')
        ]
      },
      module: {
        preLoaders: [],
          loaders: [
            {
              test: /\.(jsx|js)$/,
              exclude: /node_modules/,
              loader: 'babel-loader',
              query: {
                presets: ['es2015']
              }
            }
          ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          title: 'Seed Project',
          filename: 'index.html',
          template: 'index.tmpl.html',
          inject: 'body',
          hash: true
        })
      ]
    }

I added the context property, changed our entry point to reflect the context, and added our resolve properties.


## ReactJS and ES6

In order to see the loading of styles and other assets we really need some sort of basic react app.  So we are going to do that now.  All of these React components will be built in ES6 manner, so you will not see and `React.createClass` syntax.  So first of all we need to add react as a dependency.

    seed-project $ npm install react react-dom --save

This is where I will start showing some of the component paradigm I subscribe to.  Each react component I create will have its' own directory.  You can almost think of each of these component directories as its own little app.  This means it should have all the files it needs to work.  For this project we are going to make a `main` component with some test content.  The `app` will include the main component and render it to the page.

    seed-project $ mkdir app/components/Main && touch app/components/Main/index.js && touch app/components/Main/Main.js

We will be doing this a lot so I simplified our creation process to one task.  This creates our main directory then puts two files in it.  The `index.js` file is what will be imported into our app, while `main.js` will be our react class that handles the output of the component.

Open `app/components/Main/Main.js` and create a basic react class.  Remember I am not teaching you React with this post so I will not be explaining all of the pieces of this class.

    // app/components/Main/Main.js
    import React, { Component, PropTypes } from 'react'

    export default class Main extends Component {
      static get displayName () {
        return 'Main'
      }

      static get propTypes () {
        return {}
      }

      static get defaultProps () {
        return {}
      }

      constructor (props) {
        super(props)
      }

      render () {
        return (
          <h1>Main</h1>
        );
      }
    }

This class can be used as a snippet for all of our react classes.  Doing this will save you tons of time and ensure you are consistent with your structure.  I actually put all of this into an atom.io snippet and get all this with four characters.

Now open `app/components/Main/index.js` and pull in all the files needed for this component.  Right now its just one file.

    // app/components/Main/index.js
    import Main from './Main.js'
    export default Main

I am going to add a couple more npm packages here: [debug](https://www.npmjs.com/package/debug) and [babel-preset-react](https://www.npmjs.com/package/babel-preset-react).  We will use debug in `app/index.js` for debugging and babel-preset-react for transpiling JSX our content.

    seed-project $ npm install --save-dev debug babel-preset-react

Open our webpack config and add another loader after the JS one.

    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react']
      }
    }

Lastly open `app/index.js` and we are going to remove all existing code and put in some react.

    // app/index.js
    import debug from 'debug'
    import React from 'react'
    import { render } from 'react-dom'
    import Main from 'components/Main'

    const log = debug('application:bootstrap')

    log('creating application node')
    const applicationNode = document.createElement('div')
    applicationNode.className = 'container'
    applicationNode.id = 'application'

    log('adding application node to body')
    document.body.appendChild(applicationNode)

    render(<Main />, applicationNode, () => {
      log('finished mounting application')
    })

Time to test.  Run the build process again to make sure you don't have and build errors.  Once the build completes take a look in the browser and you should see a mostly blank page with one word on it, Main.

## Loading Styles and Assets

We are going to start buy pulling in Bootstrap as a base for all styles.

    seed-project $ npm install --save bootstrap

As Bootstrap is an application dependency, it will be imported on our primary JS file which is `app/index.js`. Insert the following line at line 1 of `app/index.js`

    import 'bootstrap/dist/css/bootstrap.min.css'

If you were to run our build now you would notice a ton of CSS printed into our console as an error.  We are loading the CSS but webpack is not able to handle it; we need to handle the loading of styles.  This process is going to be the same for every loader we need: install and configure.

    seed-project $ npm install --save-dev style-loader css-loader less-loader file-loader url-loader

Every loader does not always have its own configuration.  The loaders are tied to file types.  Some files will use multiple loaders and some loaders will be used for multiple files.  Add each of these loaders and then I will explain them individually.

    {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    },
    {
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader'
    },
    {
      test: /\.(png|jpg|jpeg|gif|svg|mp4)$/,
      loader: 'url-loader?limit=100000'
    },
    {
      test: /\.(otf|ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
      loader: 'file-loader'
    }


### [style-loader](https://github.com/webpack/style-loader)
The style loader takes CSS and inserts it into the page, thus activating the styles.

### [css-loader](https://github.com/webpack/css-loader)
This does not actually load CSS like the style loader.  It processes a CSS file and resolves import statements and url requests.

### [less-loader](https://github.com/webpack/less-loader)
Similar to the CSS loader, the LESS loader just processes the LESS files and passes them to the style loader.

### [file-loader](https://github.com/webpack/file-loader)
The file loader returns a public path to any of the associated file type resources.

### [url-loader](https://github.com/webpack/url-loader)
The url loader works like the file loader, but can return a `data url` if the file is smaller than a limit you set.

### Adding component specify style
We are going to make a specific style for our main component.

    seed-project $ touch app/components/Main/main.less

Open `app/components/Main/main.less` and add a style to the file.  I just did a color of my h1 tag.

    h1 {
      color: red;
    }

Now open `app/components/Main/index.js` and import this style.

    import './main.less'
    import Main from './Main.js'
    export default Main

Run our build again, refresh the page, and you will see the style on the page.  Ok so here is why this is important; anyone who has ever dealt with large, I mean LARGE, styles for a project have been devoured by random styles.  It can start great but become unmanageable instantly, especially if your team is not supportive of strict structure.  This seems to be a possible solution so far.

### Loading Images
This should be super easy as we already setup the file loader.  I added an svg that you can pull from the repo but any old image will work for this.  Take you new image and place it in `app/components/Main`.  We are going to assume that this image is specific to this component and not used anywhere else.  Open `app/components/Main/Main.js` so we can modify the render function a bit.  We are going to require the image and set it to a const variable.  Go ahead an log it out to your console.  You will notice that `imgSrc` is not a path but actually a data url.  Its actually the base 64 for that image.

    render () {
      const imgSrc = require('./osx.svg')

      return (
        <div>
          <h1>Main</h1>
          <img src={imgSrc} />
        </div>
      )
    }

Rebuild and you should see your image.

### Loading Other JS Libraries (optional but kind of fun)
Lets pull in another library for fun.  For this example I am going to add in [GreenSock](https://greensock.com/).  GreenSock is ultra high-performance, professional-grade animation for the modern web.  It's probably the best tool out there today if you have greater aspirations than jQuery.

    seed-project $ npm install --save gsap

Open `app/components/Main/Main.js`.  We need to include `TweenMax` from GreenSock then use it in an mouse click event.

    import React, { Component, PropTypes } from 'react'
    import TweenMax from 'gsap/src/minified/TweenMax.min.js'

    export default class Main extends Component {
      static get displayName () {
        return 'Main'
      }

      static get propTypes () {
        return {}
      }

      static get defaultProps () {
        return {}
      }

      constructor (props) {
        super(props)

        this.onClick = this.onClick.bind(this)
      }

      onClick (e) {
        const el = e.currentTarget

        TweenMax.from(el, 1, {
          css: { rotation: 360 },
          ease: window.Quad.easeInOut
        })
      }

      render () {
        const imgSrc = require('./osx.svg')

        return (
          <div>
            <h1>Main</h1>
            <img src={imgSrc} onClick={this.onClick} />
          </div>
        )
      }
    }


## Conclusion

You should now be able to completely build a project with ReactJS, ES6, and Webpack.  Once you have it working, remember to pull the caret range versions from your `package.json` to prevent unexpected errors from reckless package updates.

What?  You don't think that running a build process manually after every change is a sustainable way to write code... Me neither.  The next post in this series will cover taking all of this and putting it into a live reloading, hot swappable, thing of pure awesomeness.
