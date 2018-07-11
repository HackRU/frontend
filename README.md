# HackRU Front-End 

1.  [Contacts](#contacts-some-important-people)
2.  [Description](#description-wtf-is-this)
3.  [Inspiration](#inspiration-how-the-hell-did-we-get-here)
4.  [Installation Guide](#installation-guide-how-a-mfer-can-get-started)
5.  [Example Uses](#example-uses-why-care)
6.  [TO-DO List](#to-do-list-the-heck-are-we-doing)
7.  [Links to Further Docs](#links-to-further-docs-some-shit-i-read-when-starting-out)
    *  [JS, CSS, and HTML](#js-css-and-html)
    *  [React](#react)
    *  [Redux](#redux)
    *  [Other Libraries](#other-libraries)
    *  [ECMA 6](#ecma-6)
    *  [Coding Style Guides and Linters](#coding-style-guides-and-linters)
    *  [Testing](#testing)
    *  [Version Control on Git](#version-control-on-git)
8.  [Don't Panic](#dont-panic-i-do-that-enough)
9.  [Thanks for Making It to the End](#thanks-for-making-it-to-the-end-go-be-a-great-mfer)

## Contacts (some important people)
*  RND Co-Director: Heman Gandhi : hemangandhi@gmail.com : [hemangandhi](https://github.com/hemangandhi)
*  RND Co-Director: Qasim Abbas : qasimabbas52@gmail.com : [QasimAbbas](https://github.com/QasimAbbas)
*  Project Lead: Ezra Ablaza : ezrabl42@gmail.com : [TresTres](https://github.com/TresTres)
*  Project Alumni Mentor: [whom'st?] : [which'dve?] : [where'd'mn'st?]

## Description (wtf is this)

Welcome to HackRU's front-end.  The front-end is in charge of several things, namely what the user sees when accessing http://www.hackru.org,
and how the behind-the-scenes functionality operates so that people can navigate through and use the dashboard.  
Some things we do on the dashboard are:
1.  Sign up, login, and register
2.  Handle magic URL's
3.  Events list
4.  Slack messaging
5.  Admin dashboard

If you're on this branch, that means you're helping maintain/manage the front-end.  
Some parts of the front-end are broken, and much of the code looks/behaves yucky, and I explain this further in the document.

You have joined the team as a mechanic/manager/maintenanceperson for the front-end, otherwise known as a MF'er.

Welcome ~~to hell~~ to HackRU, MF'er.

## Inspiration (how the hell did we get here)

Heman has written a nice [wiki](https://github.com/HackRU/lcs/wiki/History) discussing the history of HackRU, and I encourage reading it for context.
You should also have at some point had a meeting with us where we demoed the current state of the front-end and discussed all open issues and goals for this HackRU.

The people who worked on the React to its current state, AFAIK, are:

*   Heman Gandhi
*   Kabir Kuriyan
*   Fan Liu


The people who have worked on the CSS to its current state, AFAIK, are:

*   David Chen
*   Kabir Kuriyan

## Installation Guide (how a MF'er can get started)

**Make sure you read the** [handbook!](https://github.com/HackRU/handbook/blob/master/architects.md)

*If you're a dev, make sure you read the* [contribution guidelines](./CONTRIB.md) and the [Redux walkthrough](./ROAD_TO_REDUX.md)

1.  After cloning in and [setting up a feature branch](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow), get `nvm` in your computer.  Use something like `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash`.  Don't forget to source your `.bashrc` afterwards.
2.  `nvm install 10` to get the stable release of Node.  Double check with `node -v`.  Then install all the dependencies listed in `package.json` using `npm install`.
3.  You should have a `.env` in the project root and a `config_resume.js` somewhere in `src`. These are purposely listed in the `.gitignore`, and you'll have to acquire them separately.  (ask Heman or any of the others listed above)
4.  Check things out by starting the server: `sh ec2-run.sh`.  Someone will probably tell you the test login/pw combo in person.  Don't share it with people outside of RND.


## Example Uses (why care)

It's literally how the HackRU Dashboard can be seen by users.  pls help.  

**Will attach screenshots**
## TO-DO List (the heck are we doing)

Your duties will be assigned according to needs, but they will follow these overarching goals:

0.  Figuring out roles (implicit)
  -   Create feature branches.
  -   Check out/investigate the current state of the front-end.
  -   Learn about its parts and how they work.
  -   Have an okayish understanding at minimum about the codebase, namely Node and Webpack, React, Redux, and JS-CSS-HTML in general. 

1.  Fixing open and immediate issues, depending on their criticality
  -   Heman is gonna open issues and yell at us.  Our job will be to attempt to fix said issues and then yell back at him.  
  -   There are gonna be edge cases to think about and unfortunately, this may result in inelegant temporary solutions.  If and when this happens, make note of what's wrong with the solution and how it acts as a band-aid.  This way, you can get back to it and fix it properly.


2.  Implementing Redux - a solution for the current yucky implementation
  -   Having done projects with just pure React before, dealing with states and props can be a terrible and annoying experience (sibling-sibling flow, child-parent flow).  With Redux, the state of everything can be managed by a central store.  This "single source of truth" can be referred to for consistent information.  
  -   Redux and good Redux practices allow the mechanics to be separated from the appearance.  Components should care about displaying results and getting input.  Handling said input, implementing business logic, and obtaining results should be handled by the actions, and as such, be kept separate.  This also allows us to worry less about accidentally having a "side effect" during part of a component life-cycle.  
  -   Finally, I think this could make us less prone to errors that occur when multiple people work on the same file.

3.  Removing modals and switching to better interfaces
  -   We don't want this "card pop-up" occurring when users need to insert input.  A form that's attached to the page will do fine enough.  Details will come later.   

4.  Testing
  -   This leads more into point 1., in the sense that we should get into the proper practices of code reviews, unit testing, integration testing, etc.
  -   This includes having a Style Guide as mentioned above, and we will be learning together some good testing schema.
  -   Make sure you test on your local branches before you push upstream, and do your best to attend meetings so we're all on the same page.

## Links to Further Docs (some shit I read when starting out)

*I will be updating this section anytime I find something useful*, so think of this less as a "required reading list" and more of a "resource reference."
But please **do read** the docs on [contributing to this project](./CONTRIB.md) and [on our transition to Redux](./ROAD_TO_REDUX.md)
If you don't read those above, you may easily run into issues.

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

### Testing: 
-  [Getting Started with Jest](https://jestjs.io/docs/en/getting-started)

### Version Control on Git:
-  [Git Cheat Sheet](https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet)


## Don't Panic (~~I do that enough~~)

Seriously, I know that this project is not part of your required curricula.  It's something extra, it's something for the community, and it means learning a lot of things on the fly.  
This can be a huge boon - you will definitely have a tremendous amount of experience, both technical-wise and organization-wise.  This community is a great opportunity to expand your network.  

In case something goes wrong, or in case of a fire, or in case you feel overwhelmed or daunted by what's going on, here are some rules that have personally helped me before:

1.  Take some time to calm down and chill out.  Health comes first, even from a practical perspective.  You can't fix anything while panicking.  HALT is a real good pattern to keep in mind:  Don't try to work on things when you are hungry, angry/upset, lonely/lost, or tired to the extent that you can't perform properly.  It will make things worse.  Heroes be damned, don't try to stay up til 5am working on something on your own.  If last minute crunching is needed, we shouldn't be doing it by ourselves.
2.  Write down what exactly has gone wrong and tell someone.  Contact me, one of the directors, our assigned rnd mentor, the git-help channel, etc.  We will all will be willing to help clean up the mess.   It's not just because this project affects all of us, and it's not just because we have a responsibility - it's because we literally have set shit on fire before and caused holy hell to occur through our mistakes.  We want to be do as much as we can, and yelling and accusing people is definitely counter-productive.  (Leave that for the post-mortem party ;) )
3.  Cooperate and work together with whoever's helping you to fix what happened as much as possible.  Stay on the issue, learn from it, and don't add or subtract from directions to prevent further issues from rising.  
4.  After it's passed, we'll all sit down and discuss the reason for what happened.  Huge breaks and long error logs can be the result of innocent mistakes or even non-mistakes that have been handled a specific way by the library/framework/language in use.  We will all benefit from learning what happened and from implementing a procedure to prevent it from happening again.  A good principle is to review the documentation given and to also write some of your own.
5.  Remember that communication is key, and that we are all very appreciative of your efforts and contributions.  If you need to stop working on HackRU, we will understand and adapt as necessary.  We just ask that you be courteous and tell of us any and all issues/questions that you have.

## Thanks for making it to the end (go be a great MF'er!)
### Kind regards, [TresTres](https://github.com/TresTres)


