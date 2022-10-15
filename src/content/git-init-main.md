---
date: 2020-12-14T00:00:00.000Z
tags: git, main, master, rename
title: Git init main
type: protip
description: Teaches how to set the default branch git creates when executing git init
---

Github has lead the way with changing a long existing convention of using a master branch in your git repositories.  I do not have much of a preference  for branch names but if someone else does, I’ll do my best to promote peace… unlike creating a new repo with a master branch, then creating a main branch from the master branch, then deleting the master branch, and finally some upstream stuff.  I know it’s not a big deal but it’s the little things that drain you.

> Enough little things combined will burry just about anything
> - Avalanche

Instead of all the hoop jumping, we can just update our git config to always create a main branch when we initialize a new repo.

Run the following command in your terminal:

```bash
git config --global init.defaultBranch main
```

This will update your `.gitconfig` and add the following:

```
[init]
  defaultBranch = main
```

Now, the next time you `git init` you will have a main instead of a master branch.
