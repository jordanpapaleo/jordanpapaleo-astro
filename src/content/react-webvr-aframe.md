---
date: 2017-06-28T22:40:32.169Z
title: React and WebVR using Aframe.io
tags: react, aframeio, webvr
type: tutorial
---

# Overview

## WebVR

"WebVR is an open standard that makes it possible to experience VR in your browser. The goal is to make it easier for everyone to get into VR experiences, no matter what device you have"  - https://webvr.info/

"WebVR is a JavaScript API for creating immersive 3D, Virtual Reality experiences in your browser." - https://webvr.rocks/

Look at both of those quotes; what do they have in common.  You will see the word experiences pop up more than once.  An experience is how we are affected by the things around us.  It's how we process, interact with, and remember stuff (That's not a clinical defination but it makes sense to me).  WebVR gives us the ability to create experiences and then immerse people into them from their browser.  You could make up some crazy wonderland that has purple oceans and a green moon. But there are a lot more really practicle uses on the horizon. VR could help you face and overcome your fears.  You could practice dangerous task with no consequences. One day we may all know what wire to cut when an explosive only has 10 seconds left (the red wire, duh).  Where I think VR could have the biggest impact is education.  What if you could really explore our solar system or go inside of a body to learn about our circulatory system (think [Innerspace](http://www.imdb.com/title/tt0093260/)).  What if we could re create historic events?  I'd be down to learn history like that.  Let's also think about how we could repidly advance immerging countries in science and medicine.  We could create virtual labs labs with an endless amount of supplies to learn chemistry or biology.  Dare I say we could one day get to a place where we no longer "practice" medicine, we know it because we have already perfomred a procedure 10,000 times in VR.  The applications of VR are endless and you don't have to get a plug implanted in the back of your head... yet.

## Our project

I spent about three months before react-vr came out working on building a prototype of an immersive epxerience and giving users the ability to create an immersive experience with the my app.  Super fun stuff.  We are going to take what I learned from that and create a relatively simple application that take an equirectangle image (360 photo) and use it as our back drop for the beginnings of a virtual experience.  To do this we will to use [ReactJS](https://facebook.github.io/react/) and [Aframe.io](https://aframe.io).

I doubt that I have to introduce React but just incase, React is a JavaScript library used for creating user interfaces.  React's updates can be rendered in multiple different ways like for the web using React Dom, for native devices using React Native, and for immersive web experiences using ReactVR.  React empowers you to focus on creating content in a modular way promoting the reusing your work.  Because writing once is better than twice ;)  But what makes React amazing is its ability to quickly identify ways your app needs to update and then make those changes.  React is fast! And just wait until React Fiber comes out.

You may not be familiar with Aframe though.  Its a super cool web framework used to build virtual reality experiences.  The Mozilla VR Team developed it as a fully open project.  You can use Aframe with React, Preact, VueJS, Angular, whatever.  You write part of your Aframe code using XML tags just like you would with HTML.  That markup is used to create a scene which is made up of multiple entities.  Oh yeah, the team is super responsive to questions too.  High five to those guys!

So some of you may be asking why not react-vr.  Its super new and is still getting itself situated.  I think it looks really promising but in all honestly I wsa using Aframe before react-vr came out.

# Project setup

## Verify your browser compaibility

Open up Google Chrome and put `chrome://gpu/` in the address bar.  This will open our Chrome GPU info.  It looks at your chrome version as well as your graphic hardware to determine what feature support you have.  We need to see happy green words next to WebGL.

![IMAGE](resources/1689D9F244148D00F7824FB50768AE5F.jpg)

## Create React App

Let's get started!  Go ahead an open up your terminal.  We need to check what version of node you have:

```bash
node -v
```

You will be fine if your ndoe version is at least 6.0.0  If it is not please or if you got an error like `command not found` follow this [link](https://nodejs.org) to get node installed or updated.

Next we need to make sure that you have the [Create React App](https://github.com/facebookincubator/create-react-app) tool installed.  We will use this tool quickly spin up a full react application and immediately get into the fun part of this blog.  Let's verify this in our terminal:

```bash
create-react-app --version
```

Hopefully you saw a version print out.  But if you get a `command not found` error, it is not installed and you can quickly fix this.

```bash
npm install -g create-react-app # globally installs this tool for your use
```

Finally, its time to creact our app.  This next step may take a minute or two.  This would be a great time to fix a grammar error in your favorite open sourece project.  Again in our terminal:

```bash
create-react-app fullstackio-webvr # creates your new app
cd fullstackio-webvr # navigate into the directory
npm start # run your app
```

So everything should be wonderful now and you should have a react application running in your browser.

![IMAGE](resources/9829F819AC1C6CF10C978F824F95AF81.jpg)

Go ahead and open this project in your favorite development tool.  Open up `src/App.js` so we can remove some code.

- Remove everything within the root div
- Clear out the import for the svg file and the css file

Your resulting code should look like this:

```
import React, { Component } from 'react';

class App extends Component {
  render () {
    return (
      <div></div>
    );
  }
}

export default App;
```

Setup Complete!

## Aframe setup

I know what you are thinking, "That was easy" and yes, you are right.  I am happy to tell you that the next part will be even easier.  We are going to install Aframe as a dependency for our app.  Aframe is a library written over top of three.js.  It was created and is supported by the Mozilla VR team.  These guys are super helpful and have been great to respond when I had questions.  Ill put a link at the bottom with their phone numbers... I mean their Slack channel.  Aframe uses a declarative way of writing code and feels very comfortable to anyone who has written JSX.  It also has an amazing debugging tool.

Back to the terminal:

```bash
npm install --save aframe
```

## Hello VR World

We now need to import aframe into our react component so its on the page then add our first tag, the scene.  The scene is the tag that all of other content will live in.  Replace the div tags with the [<a-scene>](https://aframe.io/docs/0.5.0/core/scene.html) tag.  The scene handles all of the three.js and WebVR boilerplate for us:

- Sets up the html canvas to hold our vr world
- Creates the renderer
- Starts the render loop
- Adds a default camera
- Adds a directional light
- Adds an ambient light
- And a few other cool things too

```
import 'aframe'
import React, {Component} from 'react'

class App extends Component {
  render () {
    return (
      <a-scene></a-scene>
    );
  }
}

export default App;
```

When you run this, you may see a warning in from aframe requesting that you put this dependency in a script tag in the head tag of your html.  Its fine for what we are doing.

Congratulations, you officially made a VR world.  Time to do something really cool.  With your bowser active, go ahead hit the following keys together: `<ctrl> + <alt> + i`.  This will open the visual inspector and dev tools.  On the left side of the screen you will see all of the components we just created.

![IMAGE](resources/7C28C4131872124DD963E40687414B05.jpg)

Click on the components on the left side and then check out the Aframe component in the inspector.  You will hopefully notice that our scene is not empty.  Remember those lights and the camera we mentioned above?  Thats them.  Click on the entities and move them around, zoom in and out, have a little fun.  Cool isn't it?  But it doesnt really do anything yet. I agree, lets add some more stuff.

We are going to compose a few entities aand add them to the scene.  You can think of an entity as a generic place holder object. We can apply appearance, behavior, and functionality to them.  In our example, we will be adding geometries, materials, rotations, and positions.

**[Geometry](https://aframe.io/docs/0.5.0/components/geometry.html)**: this component will provide basic shape for our entity.  It describes the physical attributes of our entity using properties like a primitive shape, width, height, and radius.

**[Material](https://aframe.io/docs/0.5.0/components/material.html)**: this component gives appearence to an entity. It describes what our entity will look like using properteis like color, opacity, or texture.

**Position** All positions in Aframe use a right-handed coordinate system.  This means that a the negative value Z axis will move away from your camera whne its looking straight forward while a positive Z value will end up behind your camera.

Update the render function of your component by adding some entities:

```
class App extends Component {
  render () {
    return (
      <a-scene>
        <a-entity geometry="primitive: box" position="-1 0.5 -3" rotation="0 45 0" material="color: #4CC3D9" />
        <a-entity geometry="primitive: sphere; radius: 1.25;" position="0 1.25 -5" material="color: #EF2D5E" />
        <a-entity geometry="primitive: cylinder; radius: 0.5, height: 1.5" position="1 0.75 -3" material="color: #FFC65D" />
        <a-entity geometry="primitive: plane; width: 4; height: 4" position="0 0 -4" rotation="-90 0 0" material="color: #7BC8A4" />
      </a-scene>
    );
  }
}
```

Aframe gives you access to a lot of primitive entities out of the box so we can add a sphere by just using the `<a-sphere>` tag.  Let's update our render function one more time.  Go to the Aframe [docs](https://aframe.io/docs/0.5.0/components/material.html) page and find one more primitive to add yo your scene

```
class App extends Component {
  render() {
    return (
      <a-scene>
        <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9" />
        <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E" />
        <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D" />
        <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4" />
      </a-scene>
    );
  }
}
```

You should really play with the inspector again `ctrl+alt+i`.  Look as the details while you drag the scene around.  Notice the shading and the light reflection.  Cool stuff!

![IMAGE](resources/580BC7A967E9C86C98AF78BCD2BF5E8E.jpg)


## Adding 360 photo

We have one more step for this super basic project.  We need to add our equirectangle image to our scene.

**Equirectangle**: this is the final form of a photo that came from a 360 degree camera.  These cameras will use multiple super wide angle lenses and capture a spherical image.  The camera has software on it to stitch these multiple images into a single image.  It will look super distorted in its raw form but we are going to use in a special way that will actually make it look normal.

First we need to find an image.  A simple search on [flickr](https://www.flickr.com/groups/equirectangular/) will give us a ton of images to use but not all of them are available for download.  Respect the rules and just keep looking until you find one that can be downloaded.  I agree, this may be the hardest part of the entire project.  Save the image to your src directory in our project.  We are going to use a new primitive called a-sky and set its' src to be the image using a require statement.  The sky is a large sphere entity with the a color or in our case a image mapped to the inside.

```
class App extends Component {
  render () {
    return (
      <a-scene>
        <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9" />
        <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E" />
        <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D" />
        <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4" />
        <a-dodecahedron color="#FF926B" radius="5" position="0 -1 -30"></a-dodecahedron>
        <a-sky src={require('./img.jpg')} />
      </a-scene>
    );
  }
}
```

Here is mine:

![IMAGE](resources/0F234BCC78719C2603C0B452B396791C.jpg)

That's it!  You have successfully created an augmented reality immersive experience using ReactJS and Aframe.io.  I really hope that I was able to spark some creativity in you projects.

The complete source for this article is also available on Github here.
