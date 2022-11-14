---
date: 2019-09-18T22:40:32.169Z
title: What Does Webpack Do Part 1
tags: Webpack, Bundle, Output, Evaluation
type: tutorial
---

## Project Overview

**Dislcaimer: failure exist with this conversion concept**

Its really important to let you know right now, what I was trying to do did not work at all.  But I learned a lot of stuff in the process that you will find valuable :)

[Repo](https://github.com/jordanpapaleo/poc-browser-modules)

## Assumptions

I am not going to talk in depth about how to use webpack.  Basic understanding of webpack, its loaders, and modern JavaScript will be helpful for you.

### Goal for this blog series

I would like to look at the output of a webpack build. I also want to understand how different otions effect the build. And more importantly, how can I use them.

### Main topics

`webpack | imports | bundling`

### Supporting topics

`IIFE | eval`

### Cool Tricks

`Quakka`

# WTF (webpack takes/transpiles/terraflops files?)

or something like that.

I am working on something.  This task involves removing the plumbing from an existing house that works in a specific way and replacing it with modern plumbing.  I'm doing this because I want everything flowing through my house to be more efficient and still get support from the manufactureres.  I'm changing build tools on a project; yes you can absolutely take pity on me.  I will gladly accept an encouraging card and hugs.

As I started down my conversion path I realized that even though I had been faithfully using webpack since the dawn of time (I even wrote a webpack 1 blog series back in the day), I truly have no idea, what the front door it's really doing.  I mean, conceptaully I totally get: take this, mix that, drop whats not used, hug a tree (or maybe its shake a tree) then bundle it for use.  Today, most of us typically `create-react-app` or `gatsby something`, start coding, and it just works.  Thank you, Gatsby, for making webpack just work (hope you read that like a Jimmy Fallon thank you note, if not go back and read it like that).  With all of the starters and boilerplates out there, you dont need to touch webpack unless you are using Storybook or trying to do someting dfferent.  This has lead to my complaciency and now I am trying to do something different.

> ProTip: If your webpack config works, leave it alone ;)

## My different thing

I am porting an old, no longer supported build build tool to webpack.  This build tool used require and allowed for JS content to be accessed from bundle file like this:

```html
<script>
  const bestJsFunctionEver = require('js/bestJsFunctionEver')
  // I could let everyone see the awesomeness but that would make this too awesome
  // Its probably safer if we just comment this bad boy out
  // bestJsFunctionEver()
</script>
```

I should note that the above code pattern lives in a, one of many, back end template file.  It doesn't really matter what type of template or what language.  It renders, it requires, it works.

I need to replicate this style of code inclusion in a different way.  I chose webpack for this and my goal is to create a bundled library with all my js.  Webpack will do what it does and I'll just use it.  I am thinking it could go something like this:

```html
<script src="js/allTheThings.js"></script>
<script module-thingy>
  import bestJsFunctionEver from 'js/bestJsFunctionEver'
  /* still not going to invoke it. The world is just not ready so dont ask.  */
</script>
```

There are a couple more details that complicate even more for me but are not critical to the majority of readers but I'll jot them down real fast.

1. We cannot use the webpack dev server becuase of how the rest of the project works.
2. We do not have a single entry file that maps to a named bundle file.  This has to do with a lot of code written long ago in a galaxy far away. It will give you bad dreams and I just can't do that to you.

So lets put this into a Todo list (I should have used all of this blog just as an intro for another todo list tutorial):

- [ ] Install webpack and loaders
- [ ] Configure webpack to build in a way to support a library
- [ ] Use content from the library build directly in the browser
- [ ] Optimize webpack
- [ ] Setup a webpack dev mode that does not use the webpack server

Part one of this series will absolutely do items one and two and part of three.  We will only look at the output of the build.  We will look at the build in the browser in the next session.

# Starting point

`loaders | code splitting | entry | output`

So most of the webpack stuff I used was a straight out of the box setup.  I took a base configuration and added a couple of loaders to handle my file types.

Here is our current project setup:

![IMAGE](/images/posts/wtf-webpack/3C019EA49AA04822A6350599642E1EDE.jpg)

Here is our `package.json` file so far:

```json
{
  "name": "browser-imports",
  "scripts": {
    "dev": "NODE_ENV=development node_modules/.bin/webpack --config webpack.config.js",
    "test": "echo \"You are a naughty person and should be punished\" && exit 1"
  },
  "devDependencies": {
    "@babel/core": "^7.3.3",
    "babel-loader": "^8.0.6",
    "css-loader": "^3.0.0",
    "raw-loader": "^3.0.0",
    "sass-loader": "^7.1.0",
    "style-loader": "^0.23.1",
    "webpack": "^4.35.2",
    "webpack-cli": "^3.3.7"
  }
}
```

Here is our base webpack config:

```javascript
// webpack.config.js
const path = require('path')

module.exports = {
  entry: {
    bundle: [
      path.resolve(__dirname, 'src/js/plop'),
      path.resolve(__dirname, 'src/js/wiz')
    ],
  },
  mode: process.env.NODE_ENV,
  output: {
    path: path.resolve(__dirname, 'public'),
  },
  optimization: {},
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/,
        use: ['css-loader', 'sass-loader'],
      },
    ],
  },
}
```

We are going to change things in the output and look at the results in the bundle to see what we made.  If you need a review of the output options, check the appendix.

## Evaluate default bundle file output

So lets just run our build in our terminal using the dev script in our `package.json` file, `npm run dev`.  Once its completed, webpack will have created a quasi-unreadable output file for us at `public/bundle.js`.  I did a quick cleanup of the code using [Beautify](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify) in my editor.  I also deleted all of the comments used to separate content; all of these things `/*********/`.  I now have a pretty clear, high level view of what webpack created.  It looks kind of like this:

```javascript
(function(modules) {
  // ... stuff
})
({
  // ... more stuff
})
```

We should talk about this. This is called IIFE (Immediate Invoked Function Expression).  Its when a function is called using the next thing as an argument.

For example:

```javascript
(function(stuff) {
  console.log(stuff)
})
({
  plop: true,
})
```

Stuff that gets consoled is the object `{ plop: true }`.  So lets look at this in context of webpack.  Our bundle file is an IIFE. The first function is the code that bootstraps webpack.  The second part is the information used while bootstrapping, its an object that resembles this:

```javascript
{
  [fileName]: IIFE,
  [anotherFileName]: IIFE,
  0: IIFE
}
```

Quick history lesson for those that do not remember the dark ages for front end development: [eval](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval) is a native JS function as old as time and will evaluate a string of JavaScript.  Those that do remember the dark ages can relate to the phrase `eval is evil`. Pretty sure that is one of the first things I learned on the job and it obvioulsy stuck.  But here I guess its not evil, its necessary.  When we look at the code in these IIFE's Webpack appears to be creating strings from our files and using `eval` to call them.

So I cleaned up the contents of one of my IIFEs, I removed the use of eval leaving the JS instead of the string.  Here is what we get:

```javascript
(function(module, __webpack_exports__, __webpack_require__) {
  'use strict'

  __webpack_require__.r(__webpack_exports__)

  /* harmony export (binding) */
  __webpack_require__.d(__webpack_exports__, "default", function() { return plop })

  function plop() {
    console.log('plop')
  }

  //# sourceURL=webpack:///./src/js/plop.js?"
})
```

We have a function that gets 3 arguments passed to it (we will look into that more later). Regardless of what is really happening, we can see that it is taking our function and using it as the return of another function... Actually, lets rewrite this funtion a little bit to make it even easier to understand (I got the const names from the bundled bootstrap function):

```javascript
(function(module, __webpack_exports__, __webpack_require__) {
  'use strict'

  function plop() {
    console.log('plop')
  }

  // TBD
  __webpack_require__.r(__webpack_exports__)

  // All of the exports for our bundle
  const allExports = __webpack_exports__

  // The name that will be used when accessing our function
  const exportName = 'default'

  // The function that will be used to access our function through the named export
  const getter = function() {
    return plop
  }

  // create a way to access our exported content
  __webpack_require__.d(allExports, exportName, getter)

  //# sourceURL=webpack:///./src/js/plop.js?"
})
```

We could kind of summarize this function like this: "Take all of the exports we have in a file and create a new one named whatevs and then take a function that will give us our function when invoked"... hmmmm.  Let me try again "Take all of our files and all their exports and create a function for each file.  These functions let us access anything that a file exports."

For fun, lets add an additional function to our `plop.js` file and just export it.  What do you think the output will look like?

```javascript
(function(module, __webpack_exports__, __webpack_require__) {
  'use strict'

  __webpack_require__.r(__webpack_exports__)

  /* harmony export (binding) */
  __webpack_require__.d(__webpack_exports__, 'default', function() { return plop })
  /* harmony export (binding) */
  __webpack_require__.d(__webpack_exports__, 'plop2', function() { return plop2 })

  function plop() {
    console.log('plop')
  }

  function plop2() {
    console.log('plop2')
  }

  //# sourceURL=webpack:///./src/js/plop.js?
})
```

We made some pretty awesome progress here.  We have uncovered half, conceptually, of what webpack creates when it makes a bundle.  And it looks like this pattern is pretty consistent with different build options.  To review: Webpack creates a hash of all files that are included/referenced through the entry points of our config file.  That means anything we import and everything it imports
content, variables names, functions, whatevs and then creates an interface to use them.  Its actually kind of pretty now (especially since we removed eval and beuatified it).

# Appendix: Review [Webpack output](https://webpack.js.org/configuration/output/)

> "The top-level output key contains set of options instructing webpack on how and where it should output your bundles, assets and anything else you bundle or load with webpack."
> Sincerely - Webpack

Thanks webpack!  Output is a root level option in our webpack config.  It gives us the ability to tell webpack how we want our content to be packaged and ultimately how it can be accessed.  In our current config, we are asking webpack to put our `bundle.js` file into the public folder at the root of our project.  We do this by setting `output.path`.  This all makes sense.Webpack looks for a few things like `[name]` and replaces that part of the string with the actual name of the file.  The file name comes directly out of our config entry points.  The example above will create this file `public/bundle-cool-stuff.js`. What do you think this will create `output.filename = 'cool-[name]-stuff.js'`?  There are more options you can use, but you will need to look it up!

