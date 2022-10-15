---
date: 2015-12-28T22:40:32.169Z
tags: Webpack, npm, standardjs
title: Building a seed project with Webpack, ReactJS, and ES6  Part 2 Setting up Webpack
type: tutorial
---

[Repo](https://github.com/jordanpapaleo/tutorial-seedProject/tree/part-two)

Ok so hopefully you read or already knew the topics presented in the [part 1](http://www.jordanpapaleo.com/blog/2015/12/22/building-a-seed-project-with-webpack-reactjs-and-es6) post of this series.  We basically went over a super basic setup of folder structure for the seed project we will be creating.

For this post we will be picking up where we left off in part one; use this [repo](https://github.com/jordanpapaleo/tutorial-seedProject/tree/part-one) to align yourself. We are going to be installing Webpack and setting up a build process.  Our build process will eventually transpile our ES6 code, processing images, apply styles, and include an additional library.  Right now it is just going to bundle some stuff together and use an html template to create static source code.


## Main Topics
[Webpack](https://webpack.github.io/docs/)


## Supporting Topics
[NPM](https://www.npmjs.com/) | [Linting](http://eslint.org/) | [Semantic Versioning](https://github.com/npm/node-semver)


## Webpack

### Overview
Webpack is a module bundler that will create static assets.  Basically we can create our project how ever we want then use Webpack to bundle everything together into a static site.  This makes it easy to deploy but can be hard to debug.

### Basic Install
Open your project in your IDE of choice and also open your project's root directory in your terminal.  We are going to be using npm a lot in this post.  You will have to have node/npm installed in order to do this.  You can verify npm by running the following in your terminal:

    $ npm -v

Hopefully you will see a version printed out.  If not you may not have node installed.  Follow [these instructions](https://nodejs.org/en/) for installation.  You will need to be at a minimum of version 3.

Ok so let's get this started.  First we are going to install Webpack and we are going to use a flag telling it to save this as a project development dependency.  It is a development dependency because it is not needed to run the application, but it is to work on it.  You will also have to install webpack globally in order to use the command line tools.

    seed-project $ npm install webpack --save-dev
    seed-project $ npm install -g webpack

If you get an error trying to install globaly you may need to change some permissions.  Some people would recommend using `sudo` for global installs but I would rather just give myself ownership of thise directories:

    seed-project $ sudo chown -R yourUser ~/.npm
    seed-project $ sudo chown -R yourUser /usr/local/lib/node_modules
    seed-project $ sudo chown -R yourUser /usr/local

This creates an entry in `package.json`.  Open that file and take a look.  You will notice webpack listed as a key on an object.  The value is the version of webpack we are using.  It is using a caret range meaning it will allow changes that do not modify the left-most non-zero digit.  Ideally this 3 part identification follows this pattern [major, minor, patch].  In a perfect world, this would be safe but it does assume the author of the package will only release breaking changes in a major version.  That is rarely true so I advise against using caret ranges and using exact version installs.  The easiest way to resolve this is to manually delete the caret from the `package.json` file.

It also copied the webpack code locally to this project and put it in the `node_modules` directory.  Every installation we do with npm will by default place content in this directory.  You may remember in the previous post we created a file to ignore content from our git repo.  Our node modules are folders we do not want versioned.  They already are so no need for us to do it too.

#### Setup Webpack Config
Next we need to create our configuration file that will instruct webpack what to do.

    seed-project $ touch webpack.config.js

Open this file in your editor and add the following code.


    // webpack.config.js
    var path = require('path')

    module.exports = {
      entry: './app/index.js',
      output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
      }
    }


So lets explain this real quick.  We are exporting a configuration object and right now we only have 2 properties in it: and entry point for webpack and an output for our bundled JavaScript file.  We can run this right now but it will throw an error as we do not have this file `app/index.js`.  Lets create a place holder file real quick from our terminal.

    seed-project $ echo "console.log('this is my app')" >> ./app/index.js

#### Running Webpack
Ok, time to run webpack.  We use the webpack command line interface (CLI) and give it a configuration file.  By default webpack will look for `webpack.config.js` so technically we do not have to pass the file name of our configuration.  I have never really liked defaults and prefer to be explicit; it's easier to understand for the next guy.

    seed-project $ webpack --config webpack.config.js

Look at your project folder structure; you should now see `dist/bundle.js`.  If you see this, go ahead and high five yourself because you did it right.  But what are we going to do with a lone JavaScript file.  We need to put this file in an html page and we need that html page in our `dist` directory.  So we could very easily just make an index.html file there and have it load `bundle.js`.  But your project should be smarter than that.  The `dist` directory should be, and eventually will be, able to be completely purged from your project every build.  This ensures you don't have any changes local on your computer that are not able to be recreated else where.  How many times have you heard "But it works on my computer".  This helps to resolve that kind of problem.

### Creating an HTML template
For this next part we need another package installed, [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin).  This plugin simplifies the creation of html files to serve our webpack bundles.  So webpack has a concept of plugins.  This allows us to use existing functionality or even write new stuff into our build processes.

    seed-project $ npm install html-webpack-plugin --save-dev

We need to create a new file to serve as our template file.

    seed-project $ touch index.tmpl.html

Open this file and add some basic html

    <!-- index.tmp.html -->
    <!DOCTYPE html>
    <html>
      <head>
        <title>{%= o.htmlWebpackPlugin.options.title %}</title>
      </head>
      <body>
      </body>
    </html>

Now go back to `webpack.config.js` so we can use this plugin in our process.

- Require this new package
- Add a new property to our configuration called plugins. Plugins is an array.
- Create a new instance of our plugin and pass in a configuration for it.

Here is the result:

    // webpack.config.js
    var path = require('path')
    var HtmlWebpackPlugin = require('html-webpack-plugin')

    module.exports = {
      entry: './app/index.js',
      output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
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


Real quick I'll explain the configuration we are using for this plugin.
- Title: Sets a property that we use in our template for the title tag.
- Filename: The name of our file once it is created. This file will be placed in the output path that we created earlier.
- Template: The template we are using to create the html file.
- Inject: Determines where we place the script tag for `bundle.js`.
- Hash: This gives us the option of adding a random query string to prevent the browser from using cached versions of a file.

There are way more configuration options available.  [Read about them](https://github.com/ampedandwired/html-webpack-plugin#configuration).


## Linting
I know by now some of you are judging me personally because of my JavaScript syntax.  Yes, I know, I did not use semicolons but that was on purpose.  To avoid [bikeshedding](http://www.urbandictionary.com/define.php?term=bikeshedding) in all of my blogs I plan to use a style that I cannot control nor manipulate.  So I will be using [StandardJS](http://standardjs.com/); you complain there if you feel the need to.  Now let's get on with it.  First install standard and a reporter.

    seed-project $ npm install --save-dev standard standard-reporter

Now let's run the code linter.  What we are going to do is run the standard code rules on all .js and .jsx files in the project, then take the output of that and run it through the the standard-reporter for better formatting and readability.

    seed-project $ standard ./**/*.js, ./**/*.jsx, *.js | standard-reporter --stylish

This should pass and basically nothing will happen.  You can test a failure by adding a semicolon after the path declaration on line 1 of `webpack.config.js`.  Save the file and then run our last terminal command.  You should see an error now.  Go ahead and revert that change, save, and run again.  Project is now listing and your code will be cleaner.  Many IDEs have really useful plugins for StandardJS too.

## NPM Script Sugar
Ok so now we have a lot of long terminal scripts that would be really hard to remember.  I think it would be great if there was a better way to standardize all of this.  There is.  So npm is not just a module manager, you can actually create and run bash scripts with it.  Go ahead and open your `package.json` file.  We are going to create a npm script for testing our code and building our distribution directory.  You should already have a scripts property in your json doc.  Here is my file now:

    {
      "name": "seed-project",
      "version": "1.0.0",
      "description": "A web seed project using webpack, react, and es6",
      "main": "./app/index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC",
      "devDependencies": {
        "html-webpack-plugin": "1.7.0",
        "standard": "^5.4.1",
        "standard-reporter": "^1.0.5",
        "webpack": "1.12.9"
      }
    }

I am going to add three scripts.  The first one is called `test` and it will run our standard code listing task.  The next one is called `build-dist` and it will delete the `dist` directory then run webpack to create a clean distribution folder.  The last one is a compound task that basically runs tasks.  It will run the test script and if it passes it will run the dist script.  If test fails it will error out the report in the terminal.

    {
      "name": "seed-project",
      "version": "1.0.0",
      "description": "A web seed project using webpack, react, and es6",
      "main": "./app/index.js",
      "scripts": {
        "test": "standard ./**/*.js, ./**/*.jsx, *.js | standard-reporter --stylish",
        "build-dist": "rm -rf ./dist && webpack --config webpack.config.js  --bail -p",
        "dist": "npm test && npm run build-dist"
      },
      "author": "",
      "license": "ISC",
      "devDependencies": {
        "html-webpack-plugin": "1.7.0",
        "standard": "^5.4.1",
        "standard-reporter": "^1.0.5",
        "webpack": "1.12.9"
      }
    }

To execute the dist script do the following:

    seed-project $ npm run dist

## Conclusion
Awesome!  We covered a lot here but this just the tip of the iceberg with Webpack and ReactJS.  Stay tuned; the next one will really put some pixels on the page.

Things to come in this series:

- Installing webpack loaders to for ReactJS, ES6, images, fonts, and styles
- Building a super tiny ReactJS example to show all the above installs working
- Using webpack to create a development server with live reload
- Building a bare bones react flux app structure
- Maybe some sort of tests
- Might be cool to get into some sort of app packaging... TBD
