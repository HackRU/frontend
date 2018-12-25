# HackRU Front-End (for the deprecated sourcecode)

This is the web frontend for HackRU, made with React, Redux, and Bootstrap. The live site is [here](http://hackru.org) and the development version is [here](http://dev.hackru.org)

1.  [Description](#description)
3.  [Inspiration](#inspiration)
4.  [Installation Guide](#installation)
6.  [TO-DO List](#to-do-list)
7.  [Links to Further Docs](#links-to-further-docs)
    *  [JS, CSS, and HTML](#js-css-and-html)
    *  [React](#react)
    *  [Redux](#redux)
    *  [Other Libraries](#other-libraries)
    *  [ECMA 6](#ecma-6)
    *  [Coding Style Guides and Linters](#coding-style-guides-and-linters)
    *  [Testing and CI](#testing-and-ci)
    *  [Version Control on Git](#version-control-on-git)
8.  [Don't Panic](#dont-panic)
9.  [Thanks for Making It to the End](#thanks-for-making-it-to-the-end)


## Description

Welcome to HackRU's front-end.  The front-end is in charge of several things, namely what the user sees when accessing http://www.hackru.org,
and how the behind-the-scenes functionality operates so that people can navigate through and use the dashboard.

Some things we do on the dashboard are:
1.  Sign up, login, and register
2.  Handle magic URL's
3.  Events list
4.  Slack messaging
5.  Admin dashboard

There are plans to separate the dashboard into a user section (remaining on the dashboard page) and a user-agnostic section (on a "live" page, that would have events list and Slack.)

## Inspiration

Heman has written a nice [wiki](https://github.com/HackRU/lcs/wiki/History) discussing the history of HackRU, which is encouraged reading.

The people who worked on the React to its current state, AFAIK, are:

*   Heman Gandhi
*   Kabir Kuriyan
*   Fan Liu
*   Ryan Goldstein

The people who have worked on the CSS to its current state, AFAIK, are:

*   David Chen
*   Kabir Kuriyan

## Installation Guide

**Make sure you read the** [handbook!](https://github.com/HackRU/handbook/blob/master/architects.md)

*If you're a dev, make sure you read the* [contribution guidelines](./CONTRIBUTING.md) and the [Redux walkthrough](./ROAD_TO_REDUX.md)

1.  After cloning in and [setting up a feature branch](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow), get `nvm` in your computer.  Use something like `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash`.  Don't forget to source your `.bashrc` afterwards (`source ~/.bashrc`)
2.  `nvm install 10` to get the stable release of Node.  Double check with `node -v`.  Then install all the dependencies listed in `package.json` using `npm install`.  You should also have `aws` installed; Please only use `sudo pip install awscli`;
3.  There are two files that have authentication secrets: `.env` and `config_resume.js`. They are purposely listed in the `.gitignore`, and you'll have to acquire them separately (ask the lead of the web-frontend team). Place `.env` in the project root and `config_resume.js` in the `src` folder.
4.  Check things out by starting the server: `npm start`.  Someone will probably tell you the test login/pw combo in person.  Don't share it with people outside of RND.

## Links to Further Docs (some shit I read when starting out)

*I will be updating this section anytime I find something useful*, so think of this less as a "required reading list" and more of a "resource reference."
But please **do read** the docs on [contributing to this project](./CONTRIBUTING.md) and [on our transition to Redux](./ROAD_TO_REDUX.md).
If you don't read those, you may easily run into issues.

### JS, CSS, and HTML 
(Personally I recommend W3Schools over MDN):
-  [W3Schools HTML5](https://www.w3schools.com/Html/default.asp)
-  [W3Schools JS](https://www.w3schools.com/js/default.asp)
-  [W3Schools CSS](https://www.w3schools.com/css/default.asp)
-  [MDN Docs HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
-  [MDN Docs JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
-  [MDN Docs CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

### React:
-  [React Main Concepts](https://reactjs.org/docs/hello-world.html)
-  [A Really Crappy React Tutorial](https://reactjs.org/tutorial/tutorial.html)
-  [A Much Better React Tutorial](https://tylermcginnis.com/reactjs-tutorial-a-comprehensive-guide-to-building-apps-with-react/)
-  [A Guide to React Component Lifecycles](https://medium.com/@baphemot/understanding-reactjs-component-life-cycle-823a640b3e8d)
-  [Another Guide to React Component Lifecycles](https://hackernoon.com/reactjs-component-lifecycle-methods-a-deep-dive-38275d9d13c0)
-  [React Developer Tools](https://github.com/facebook/react-devtools)
-  [Validating Using PropTypes](https://steemit.com/utopian-io/@jfuenmayor96/validating-the-props-of-your-react-components-with-proptypes)

### Redux:
-  [Pretty Okay Redux Documentation](https://redux.js.org/)
-  [Redux To-Do List Example](https://redux.js.org/basics/example-todo-list)
-  [A Really Great Read on Learning Redux](https://daveceddia.com/how-does-redux-work/)
-  [Why Use Redux](https://hackernoon.com/how-to-redux-with-react-836ed6d85330)
-  [Redux Developer Tools](https://github.com/zalmoxisus/redux-devtools-extension) 
-  [Good Example of Making API Calls in Redux](https://stackoverflow.com/questions/39813984/how-to-fetch-data-through-api-in-redux)
-  [Why Use Action Creators?](https://blog.isquaredsoftware.com/2016/10/idiomatic-redux-why-use-action-creators/?utm_source=hashnode.com)

### Other Libraries:
-  [An Overview of NPM, Babel, and Webpack](https://medium.com/front-end-hacking/what-are-npm-yarn-babel-and-webpack-and-how-to-properly-use-them-d835a758f987)

### ECMA 6:
-  [The Difference Between JS and ECMAScript](https://medium.freecodecamp.org/whats-the-difference-between-javascript-and-ecmascript-cba48c73a2b5)
-  [ECMA 6 Features](http://es6-features.org)

### Coding Style Guides and Linters:
-  [Overview of Style Guides + Some Examples](https://codeburst.io/5-javascript-style-guides-including-airbnb-github-google-88cbc6b2b7aa)
-  [Using ESLint](https://eslint.org/docs/user-guide/getting-started)

### Testing and CI:
-  [Continuous Integration Essentials](https://codeship.com/continuous-integration-essentials)
-  [Getting Started with Jest](https://jestjs.io/docs/en/getting-started)

### Version Control on Git:
-  [Git Cheat Sheet](https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet)


## Don't Panic

Seriously, this project is not part of your required curricula.  It's something extra, it's something for the community, and it means learning a lot of things on the fly.
This can be a huge boon - you will definitely have a tremendous amount of experience, both technical-wise and organization-wise.  This community is a great opportunity to expand your network.

In case something goes wrong, or in case of a fire, or in case you feel overwhelmed or daunted by what's going on, here are some rules of thumb:

1.  Take some time to calm down and chill out.  Health comes first, even from a practical perspective.  You can't fix anything while panicking.  HALT is a real good pattern to keep in mind:  Don't try to work on things when you are hungry, angry/upset, lonely/lost, or tired to the extent that you can't perform properly.  It will make things worse.  Heroes be damned, don't try to stay up til 5am working on something on your own.  If last minute crunching is needed, we shouldn't be doing it by ourselves.
2.  Write down what exactly has gone wrong and tell someone.  Contact the team lead, one of the directors, our assigned rnd mentor, the git-help channel, etc.  We will all will be willing to help clean up the mess.   It's not just because this project affects all of us, and it's not just because we have a responsibility - it's because we literally have set shit on fire before and caused holy hell to occur through our mistakes.  We want to be do as much as we can, and yelling and accusing people is definitely counter-productive.
3.  Cooperate and work together with whoever's helping you to fix what happened as much as possible.  Stay on the issue, learn from it, and don't add or subtract from directions to prevent further issues from rising.  
4.  After it's passed, we'll all sit down and discuss the reason for what happened.  Huge breaks and long error logs can be the result of innocent mistakes or even non-mistakes that have been handled a specific way by the library/framework/language in use.  We will all benefit from learning what happened and from implementing a procedure to prevent it from happening again.  A good principle is to review the documentation given and to also write some of your own.
5.  Remember that communication is key, and that we are all very appreciative of your efforts and contributions.  If you need to stop working on HackRU, we will understand and adapt as necessary.  We just ask that you be courteous and tell of us any and all issues/questions that you have.

## Thanks for Making It to the End

Kind regards, the web frontend team

