---
date: 2015-12-22T00:00:00.000Z
tags: JavaScript, Webpack, ReactJS, ES6
title: Building a seed project with Webpack, ReactJS, and ES6  Part 1 Overview and Setup
type: tutorial
---

## Project Overview

I have always thought one of the most difficult and frustrating parts of development is just getting started.  There are so many different packages, and repos, npm installs this, --save (should I make it dev), bowers, then I need a gulp of something, and the entire process is usually full of grunts.  Needless to say, many of my initial concepts to change the world have been stifled by this brain surgery like process. Note: in no way am I really comparing what I am doing to brain surgery.  I just want something that's basic, that makes sense, and that I can explain to you.  I hate just using something because it works.  So I will do my best in this blog series to explain the purpose of most of the dependencies.  I will do my best to bring a little clarity to the clutter.  I will explain a lot of stuff that many people take for granted.  All apologies if I go too basic at times.

### Goal for this blog series
1. Teach you how to pull a seed together and understand why we did what we did.
1. I will not teach you how to write react or the ins and outs of ES6 as there are a ton of great resources out there.
1. Lastly, I want to have a seed project that I can clone and start coding in with minimal effort.

### Main topics
#### [EcmaScript 6]()
The majority of this project will be coded using the ES6 standard.  Using ES6 comes at a cost though, it still needs to be transpiled.  This means that the ES6 code will need to be processed and converted to an older version of JavaScript that works on all browsers.

#### [Webpack](https://webpack.github.io/docs/)
We will be using a lot of different code repositories to create the optimal developer environment.  Webpack is going to be our go to tool for our development and for making a distribution package that we could host on a web server somewhere.


#### [ReactJS](https://facebook.github.io/react/)
React is my new best friend, replacing angular. React is the front end framework that I will be implementing.


### Supporting topics
#### [Babel](https://babeljs.io/)
This is the transpiler code we will use to convert our ES6 JavaScript to ES5 so it will work in browsers.  Babel allows us to use the tech of tomorrow today.


#### [Flux](https://facebook.github.io/flux/)
This project will be setup using the flux architecture.  You don't have to know this topic in order to go through this lesson.  You don't even need to do the flux part... Now that I think about it, I don't either.  I will do the flux stuff last so you can skip it.  I will even let you know when to tune out if you are not interested in flux.

#### [NPM](https://www.npmjs.com/)
Npm is the default package manager for the JavaScript/NodeJS environment.  In normal terms, npm allows people to create useful projects and then share them with the rest of the world.  Npm can make your work load a lot easier, but it can also lead you down some crazy rabbit holes.

#### [Code linting via eslint](http://eslint.org/)
Having code that is valid is super important.  Having code that is performant is also super important. But having code that is maintainable and readable by the next guy is one of the most important tasks for a developer.  Having code that can be validated is a part of this process; we will use eslint for that.

#### [Git/Github](https://github.com/)
Github is a version control service that I will be using for this project.  Each part of this post will have its own branch of code.  The master branch for this repository will be the final project.  If you need more information on using git please look [here](https://git-scm.com/documentation).


## Setup
In this first part of the series we will be going over creating you project, setting up folders, and putting all of this stuff into version control.  Feel free to skip this part if you want.  But you could also read it and provide some feedback on my process.  Who knows, maybe together we can do it better than I can alone.

### What you will need:
1. Some sort of text editor program, not a document editor (Word, Pages, etc).  Editors are a very personal thing and you do not have to use what I use.  Lately I have been using [atom.io](https://atom.io/).  Its free, customizable, and I like the themes.  Plus their t-shirts are super soft (I wish I did not lose mine).  I like soft clothes and nice colors, what can I say.  Some other popular tools out there are Sublime Text, WebStorm, Emacs, Visual Studio, and Notepad++.  Use what you want and do not think that yours is the best; it's all about preference.
2. You will need to have [node installed](https://nodejs.org/).
3. I will be using git for version control; you do not have to.  If you want to follow with the entire process, you will need something though.
4. Also I will be doing some work in my terminal.  I am using OS X El Capitan.

### Create the project
**Scaffolding**

Open you terminal and navigate to where you would like to create your project.  Create a new directory and call it `seed-project`.  We will then make 2 more directories in seed-project: app and templates.

I am going to use my terminal for this:

    $ mkdir seed-project
    $ cd seed-project
    seed-project $ mkdir app templates

**Git**

In order to use version control we will need to initialize seed-project as an empty git repository.  This is kind of where you can do whatever you want with your version control.  I will be making branches for each part of this blog.  Here is what I did.  I created a new public repo in my Github account.  Git hub gives you the exact commands to use to initialize your repo and a nice little copy to clipboard button.  I just copy the commands with their button and then paste it into my terminal.

Next I am going to create a file that git will use to know whether or not content from your project should be in version control.  For example, we do not want all of our npm packages to be in version control.  That would take up a lot of unnecessary space and kind of defeat the purpose of using npm.  More on that later.  For now we are just going to create a `.gitignore` file and add the `node_modules` directory to it.  Don't worry, we will have that folder in the near future.

    echo "node_modules" >> .gitignore

**Npm**

We now need to initialize npm so we can leverage all sorts of code repositories for our project.  Running `npm init` from your terminal will start a series of prompts in the terminal to aid in creating a config file for your project.  The is the `package.json` file.  You do not have to do this with the npm init command.  You can just create the json file by hand, but we will use the init command.

    seed-project jordan$ npm init

The first prompt is the name of your project.  Npm tries to offer sensible defaults when it can.  To accept the default you can just press `return`.  Accept the default name and version unless you want to change the semantic versioning to 0.1.0.

    name: (seed-project)
    version: (1.0.0)

Just accept the defaults for the rest of the prompts.  We can always change them later.  This process should have created the following package.json file:


    {
      "name": "seed-project",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC"
    }


Be careful when manually working with the package.json file.  A malformed json file will throw an error and prevent you from executing any npm commands.

## Conclusion
I am stopping here because it just seems like a good spot conceptually.  Right now I imagine some of you may feel like you just wasted some time. Others will hopefully have had some insights into the creation of a project.  This is foundational to all projects and we are starting at the beginning to ensure this is a thorough and complete explanation of creating the seed project.  Fortunately, this part of the project is super agnostic to tech and can be easily reproduced.  In the future, you won't even think twice about doing this.
