---
date: 2020-05-26T22:40:32.169Z
tags: javascript, type ahead, debounce, promise, chaining
title: Debouncing an API call with promise chaining
type: protip
---

*The understanding of promises will really help you as we are not teaching about promises in this post but for sure using them. You can learn more here:*

[MDN: Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## TLDR: Working Code

<iframe
  src="https://codesandbox.io/embed/cold-frost-5o4gn?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="cold-frost-5o4gn"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts allow-autoplay"
></iframe>

## Terms
### debounce
To remove the small ripple of current that forms when a mechanical switch is pushed in an electrical circuit and makes a series of short contacts… thanks for nothing Webster.
Think of it like this: debouncing is the process of setting up a function to only execute the last time it’s called within a set timeout.

## Tools
### Lodash: debounce
[Lodash](https://lodash.com) is just about the most amazing library for JavaScript.  Thank you [John David Dalton](https://twitter.com/jdalton?lang=en) for going years making a git commit every day!  (I actually met him a long time ago) It is a JavaScript utility library that gives you a ton of awesome methods like debounce.  It removes the cognitive load for solving some common problems.  Check out the docs.

## Scenario
There is an API endpoint we can use to look up values using whatever string we send it.  There is an API endpoint we wrote this function that uses the API with whatever value a person types into a text input.  We could call this function after the user clicks away from the input or with a button but it would be so much cooler to use it for type ahead search.  Way cool!

```html
<label>
  Search Ahead
  <input type="text" id="search-ahead" />
</label>

<script>
  function searchApi(key) {
  // Mock api function that returns data after 750ms
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(['possible', 'things', 'that', 'were', 'found'])
      }, 750)
    })
  }

  function handleChange(e) {
    searchApi(e.target.value)
      .then((results) => { console.log(results) })
      .catch((err) => { console.log(err) })
  }

  const inputEl = document.getElementById('search-ahead')
  inputEl.addEventListener('input', handleChange)
</script>
```

We call the function when the user types. Each key press is changing the value *aaaaand* invoking our search API function so we essentially just performed a DDoS attack on the API we are consuming by firing off 50 HTTP requests in a matter of seconds… **AND** there is no guarantee which call returning has the best data in the best order.  What if our last call returns first somehow?  The calls after it will be wrong.  Ugh… this sucks… oh yeah, our api key was just revoked too. FML!

> **Problem**: We made way too many meaningless API calls.  The only one that really matters is our last one, after the user stops typing.

### Enter lodash

Ok, we can use lodash’s debounce function to make sure the api call is only made the last time a function gets called.  Basically, every keypress from the user within a set time will cancel the previous and reset the timer.  Our code could look something like this:

```html
<label>
  Search Ahead
  <input type="text" id="search-ahead" />
</label>

<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.15/lodash.min.js"></script>
<script>
  function searchApi(key) {
  // Mock api function that returns data after 750ms
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(['possible', 'things', 'that', 'were', 'found'])
      }, 750)
    })
  }

  const debouncedSearch = _.debounce(searchApi, 500)

  function handleChange(e) {
    debouncedSearch(e.target.value)
      // Ask yourself why these are commented out... like now. DO IT, DO IT
      // .then((results) => { console.log(results) })
      // .catch((err) => { console.log(err) })
  }

  const inputEl = document.getElementById('search-ahead')
  inputEl.addEventListener('input', handleChange)
</script>
```

Every change made will invoke `debouncedSearch` and start a 500ms timer.  If the next keypress happens within the 500ms, the previous function call is cancelled, the value used for the api call will be updated with the current value of the input and the timer will start over.  This will happen every time the input component changes value.  I could press a letter and delete it then repeat FOR-EV-ER.  But there is an issue here; our debounced function call does not return anything much less a Promise.  It’s timing function.  No Promise means we cannot call then or catch in the Promise chain.  If we uncomment our then and catch block we will see this error: `Cannot read property 'then' of undefined`

Ok, so we are kind of stuck here.  We need a Promise but we also need to debounce our API calls.  So we have a couple of options here:

1. Write a custom debounce function…ew
2. Find a way to make lodash work

Number two sounds way more not ew.  The approach selected required us to update the method signature of our debounced function and use an anonymous function.   Let’s try this one more time:

```html
<label>
  Search Ahead
  <input type="text" id="search-ahead" />
</label>

<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.15/lodash.min.js"></script>
<script>
  function searchApi(key) {
    // Mock api function that returns data after 750ms
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(['possible', 'things', 'that', 'were', 'found'])
      }, 750)
    })
  }

  const debouncedSearch = _.debounce((key, resolve, reject) => {
    searchApi(key)
      .then(resolve)
      .catch(reject)
  }, 500)

  function handleChange(e) {
    debouncedSearch(
      e.target.value,
      (results) => { console.log(results) },
      (err) => { console.log(err) }
    )
  }

  const inputEl = document.getElementById('search-ahead')
  inputEl.addEventListener('input', handleChange)
</script>
```

We no longer are passing the search function to debounce; we are invoking it from within this anonymous function.   We also updated the method signature of `debouncedSearch` to take the search value, an anonymous resolve function, and an anonymous reject function.  Then we execute our Promise chain from within the debounced function, providing the resolve and reject functions correctly.

Thank you, method signatures, for letting us still use Promise chaining with lodash debounce.
