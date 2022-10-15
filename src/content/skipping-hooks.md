---
date: 2020-09-08T00:00:00.000Z
tags: git
title: Skipping a git pre commit hook
type: protip
---

Having pre commit hooks can be awesome and can suck at the same time.  My work project implements pre commit hooks using husky and  lint-staged.  These hooks are for coding standards.

```
{
  "author": "Theorem.co",
  "scripts": {
    "fix:mylife": "$(npm bin)/eslint 'src/js/**' --cache --fix",
  },
  "devDependencies": {
    "husky": "4.2.5",
    "lint-staged": "10.1.6"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.js": [
      "npm run fix:mylife"
    ],
    "*.rb": [
      "rubocop -a"
    ]
  }
}
```

This is great and it has really upped the quality of our code.  The team likes it too but… yeah there’s always a but.  Personally,I like to do a block of work then choreograph my commits, staging specific lines from files and then commit them.  I do this back to back for many commits.  It’s kind of like looking back and telling a story of how this came to be.

I’m sure you can imagine how difficult this could be if we are running eslint with a fix on each commit.

Enter the `--no-verify` or `-n` commit flag.

```
git commit -nm "Message for a no verify commit"
```

This will skip my commit hooks.  Yeah its totally cheating but I totally run all my format commands before I do this so its ok.
