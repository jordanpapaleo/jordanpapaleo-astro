---
date: 2016-03-28T22:40:32.169Z
title: Setting up your dev environment and intro to developer concepts
tags: Developer Environment, Setup, Web
type: tutorial
---

## Browser

There are many options out there for a browser.  The majority of people out there just use the browser that came on their computer because they don't know any better.  But now that you are getting into development you do.  All browser are **not** created equal.  If you are writing and testing code you should use either

- [Google Chrome](https://www.google.com/chrome/browser/desktop/index.html)
- [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/desktop/)
- [Chrome Canary](https://www.google.com/intl/en/chrome/browser/canary.html?brand=KERZ#eula).  Google Chrome Canary has the newest of the new Chrome features. Be forewarned: it's designed for developers and early adopters, and can sometimes break down completely.

So the reason you would use one of these is because or their debugging tools; meaning you have the ability to peer into the web page in a super efficient way to either see how it is working or why its broken.

Remember it is important to regularly view the code you write in multiple browsers.  Different browsers will show your content in different ways.  It will even prevent you from using the same HTML, CSS, and JavaScript features.  The advanced browsers are known as evergreen browsers.  They will self update with out a major press release or marketing version.  Anyone who has ever worked in the web still gets shivers when they hear the name IE6.

For this course you will be developing in Google Chrome.  We will not be addressing supporting non evergreen browsers.

### Setup Chrome
1. Download [Google Chrome](https://www.google.com/chrome/browser/desktop/index.html)
2. Install it with all the default settings
3. Open Chrome
4. Install plugin [Web developer](https://chrome.google.com/webstore/detail/web-developer/bfbameneiokkgbdmiekhjnmfkcnldhhm?hl=en-US)
5. Install plugin [Wappalzyer](https://wappalyzer.com/download)
6. Install plugin [Clear Cache](https://chrome.google.com/webstore/detail/clear-cache/cppjkneekbjaeellbfkmgnhonkkjfpdn?hl=en)

### Chrome Dev tools
There are entire courses out there strictly teaching people how to use the chrome dev tools.  Opend the dev tools by right clicking on a web page and selecting *Inspect*.  We will only really be using two of these resources: *Elements*, *Console*, and maybe *Device Mode*.

That's it for now, but don't worry you will get a lot of time with this.

## Choosing an editor

A text editor is not the same as a word processor.  A word processor allows you to independently apply styles to text like italics, bold, underline, size, and font.  Word processors were designed to create content to be read by people.  It like looking at a website.  You see the result of the formatting to make content easier to read.

A text editor is specific for writing code.  It can apply formatting based on file extension; you cannot just randomly make a word large or big or red.  You can write upper and lower case letters, numbers, and symbols.  The default font is always set to a monospaced font (each character is the same width).  This really helps visually align your code.

A text editor is not the same as and IDE (integrated development environment).  An IDE is more of a toolbox while a text editor is more of a tool.  IDE can really help with testing and compiling code but that comes at a price.  A lot of times you will have to buy an IDE and they have the potential to use a lot of your system resources and they can run on the slower side.  Some languages require an IDE.  These languages are monolithic and rarely have the coolest tech available.

A text editor is usually a pretty fast application.  When I said its more of a tool than a tool box you have to know that its a super tool thanks to the extensibility of the tool.  You can install all sorts of plugins that will give your editor more power.

Editors are very personal, and each persons editor of choice is always the best.  If you have one, I will not try to change your mind.  But know that if you use the one I use (bc its the best) I will be able to help you write code in a very efficient way.

### Some Editors

- Atom.io
- Sublime Text
- Visual Code
- Notepad++
- VIM
- Emacs

I use atom.io because its pretty.  It is the first editor I used where i did not want to immediately change the colors.  But truly atom is one of the more extensible editors out there.  It was also built using html, css, and javascript.  You can inspect this by opening the Developer Tools: *View > Toggle Developer Tools* menu, or by using the *cmd-alt-i* or *ctrl-alt-i*.

### Setup Atom.io
1. Download [Atom](https://atom.io/)
2. Install Atom with all the default options
	3. Windows note: You may need to rename the downloaded file to have a *.exe* extension
3. Open Atom

### Configure Atom
Atom has a ton of configurations that can be installed. We are going to install a few that will help us get started.

[Snippets](https://raw.githubusercontent.com/jordanpapaleo/_configs/master/atom/snippets.cson) | [Keymap MAC](https://raw.githubusercontent.com/jordanpapaleo/_configs/master/atom/keymap.cson) | [Keymap WIN](https://github.com/jordanpapaleo/_configs/blob/master/atom/keymap.WIN.cson) | [Config](https://raw.githubusercontent.com/jordanpapaleo/_configs/master/atom/config.cson)

**Mac**

1. Open the *Atom* menu and select *Preferences*
2. Click *Open Config Folder*
3. Replace the content in each file with the appropriate content from above
4. Close the config window

**Windows**

1. Open the *File* menu and select *Settings*
2. Click *Open Config Folder*
3. Replace the content in each file with the appropriate content from above
4. Close the config window


### Code Quality Tools
Atom allows its functionality to be extended the the installation of Packages.  Packages can be used for many things, but our main use for them now is to aid in the writing of clean and syntactically correct code.

1. We need to open our *Atom Settings* again (you just did that).
2. Click *Packages*
	- These are the packages that are already installed in our editor
	- Each one of them has settings that you can go into but for the core packages is usually good to leave them alone
1. Click *+ Install* and lets install these packages
	- editorconfig
	- linter
	- linter-standard-js
	- linter-htmlhint
	- linter-stylelint

### Recommended reading (or at least looking through)
- [Atom Flight Manual](http://flight-manual.atom.io/)

## OS Tweaks
We do a lot of things with files that normal users don't need to see.  A lot of files on your computers are hidden to prevent people from breaking stuff.  Its required that we see these files.  It is also super important that we show file extensions too.

**Mac**

1. Open your terminal
2. `defaults write com.apple.finder AppleShowAllFiles TRUE`
3. Open Finder and Finder Preferences
4. Click the *Advanced* tab
5. Check *Show all filename extensions*


**Windows**

1. Open your Explorer
1. Press the *alt* button to bring up your menu options
1. Open the *Tools* menu and select *Folder Options*
1. Click the *View* tab at the top
1. Under the *Advanced settings* there is a option for *Hidden files and folders*, select *Show hidden files, folders, and drives*
1. Uncheck *Hide extensions for known file types*
1. Click the `Apply to Folders` button
1. Click *Ok*


## Using your Terminal or Command Line
When most people think of programming a picture of the terminal may pop in ther head.  It has the potential to be an intimidating tool but as a developer you will discover that you will not be able to live with you, and you will also realize it's not difficult to use at all.

**Open your console**.  This is going to be a hands on exercise

**Mac**

1. Mac: cmd + space Terminal
1. Get your current directory `pwd`
1. Get the name of the logged in user `whoami`
1. List the content in your current directory `ls`
1. Change you directory to your Desktop `cd Desktop`
1. Make a new directory called New `mkdir New`
1. Navigate into that directory `cd New`
1. Create a new file called README.md `echo hello > test.txt`
1. Open this directory in Finder `open .`
1. Go to the immediate parent directory `cd ..`
1. Close the terminal `exit`

**Windows**

1. Win: Start > Run Command Prompt
1. Get your current directory  `cd`
1. Get the name of the logged in user `whoami`
1. List the content in your current directory `dir`
1. Change you directory to your Desktop `cd Desktop`
1. Make a new directory called New `mkdir New`
1. Navigate into that directory `cd New`
1. Create a new file called README.md `echo hello > test.txt`
1. Open this directory in Explorer `explorer .`
1. Go to the immediate parent directory `cd ..`
1. Delete the New directory `rd New`
1. Close the terminal `exit`


## Version Control

Version control is a technological solution for being human.  How many of you have ever deleted or changed something that you regret?  We all have.  Programmers don't just write code, we have this nasty habit of changing code.  Unfortunately, no programmer is perfect, and sometimes, mistakes are made. Version control gives us the ability to go back to an older version of a file.  It also allows us to see the changes that have occurred to a file over time.

There are many version control systems out there. Often they are divided into two groups: `centralized` and `distributed`.

**Centralized** version control systems (CVCS) are based on the idea that there is a single central copy of your project somewhere (probably on a server), and programmers will commit their changes to this central copy.  Examples: CVS, Subversion, and Perforce.

**Distributed** systems (DVCS) do not necessarily rely on a central server to store all the versions of a project's files. Instead, every developer a copy of a repository and has the full history of the project on their own hard drive. This copy (or clone) has all of the metadata of the original. Examples: Git, Mercurial, Bazaar or Darcs.

<!--![image](https://git-scm.com/book/en/v2/book/01-introduction/images/distributed.png)-->

**Read More**

- [Wikipedia](https://en.wikipedia.org/wiki/Version_control)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control)

### Git

Git is a distributed system.  Conceptually, most other systems store information as a list of file-based changes. You think of the information they keep as a set of files and the changes made to each file over time.

<!--![image](https://git-scm.com/book/en/v2/book/01-introduction/images/deltas.png)-->

Instead, Git thinks of its data more like a set of snapshots of a miniature filesystem.
<!--![image](https://git-scm.com/book/en/v2/book/01-introduction/images/snapshots.png)-->

Most of the interaction you have with git will be on your own local computer.  Git can operate completely independently of a network connection; it doesn’t need to go out to the server to get the history and display it for you.  This is accomplished by having a local git repository/database.  You work with it and when you are ready, you can sync up with a git repository on the internet.

There are 3 states of a file in git: committed, modified, and staged.

- Committed: The data is safely stored in your local repo/database.
- Modified: You have changed the file but have not committed it to your database yet.
- Staged: You have marked a modified file in its current version to go into your next commit.

<!--![image](https://git-scm.com/book/en/v2/book/01-introduction/images/areas.png)-->

The basic Git workflow goes something like this:

1. You modify files in your working directory.
1. You stage the files, adding snapshots of them to your staging area.
1. You do a commit, which takes the files as they are in the staging area and stores that snapshot permanently to your Git directory.

### GitHub
GitHub is a code hosting platform for git that promotes collaboration. It lets you and others work together on projects from anywhere.  You can create projects for just about anything.  I use GitHub to hold the code my projects, to let me contribute to the code on other projects, to keep track of my computers configuration files, and to even plan events.

You will use GH to keep track of every piece of code you write in this class.  By the end of this session you will have put a ton of content into your own personal repository.

### GitHub Setup
1. Go to [GitHub](https://github.com/)
2. Sign up
3. [EXERCISE: Learning GitHub](https://guides.github.com/activities/hello-world/)

### GitHub Issues
Github uses a concept of issues.  The purpose of issues is basically calling out something thats broken or needs to be done.  Issues are not a part of *git*; they are purely a GH feature.

# You now know enough to be dangerous, so be careful and stay tuned for more
